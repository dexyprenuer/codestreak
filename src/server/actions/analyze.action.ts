'use server';

import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { checkRateLimit, incrementRateLimit } from '@/lib/rate-limit';
import { analyzeCode } from '@/server/services/analysis.service';
import { generateChallenge } from '@/server/services/challenge.service';
import { updateStreakAfterSubmission } from '@/server/services/streak.service';
import { AnalysisResult } from '@/types/analysis';

const SUPPORTED_LANGUAGES = [
  'javascript', 'typescript', 'python', 'java', 'cpp', 'go', 'rust', 'php', 'ruby', 'swift'
];
const MAX_CODE_LENGTH = 5000;

export async function analyzeCodeAction(
  language: string,
  code: string
): Promise<{ success: boolean; data?: AnalysisResult; error?: string }> {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return { success: false, error: 'Unauthorized' };
  }

  // Validate input
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    return { success: false, error: 'Unsupported language' };
  }
  if (!code.trim()) {
    return { success: false, error: 'Code cannot be empty' };
  }
  if (code.length > MAX_CODE_LENGTH) {
    return { success: false, error: `Code exceeds ${MAX_CODE_LENGTH} characters` };
  }

  // Get user from DB
  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) {
    return { success: false, error: 'User not found' };
  }

  // Rate limit
  const rateLimit = await checkRateLimit(clerkId);
  if (!rateLimit.allowed) {
    return { success: false, error: `You've used 5/5 analyses today. Resets at midnight.` };
  }

  // Call AI for analysis
  let feedback;
  try {
    feedback = await analyzeCode(language, code);
  } catch (err) {
    console.error('AI analysis failed:', err);
    return { success: false, error: 'AI service error. Please try again.' };
  }

  // Save submission
  const submission = await prisma.submission.create({
    data: {
      userId: user.id,
      language,
      code,
      score: feedback.score,
      feedback: feedback as any,
    },
  });

  // Generate challenge
  let challengeData;
  try {
    const generated = await generateChallenge(language, feedback.score, feedback.weaknesses);
    challengeData = await prisma.challenge.create({
      data: {
        userId: user.id,
        submissionId: submission.id,
        title: generated.title,
        difficulty: generated.difficulty,
        description: generated.description,
        hints: generated.hints as any,
        language: generated.language,
      },
    });
  } catch (err) {
    console.error('Challenge generation failed:', err);
    // Continue without challenge if fails
    challengeData = null;
  }

  // Update streak
  const newStreak = await updateStreakAfterSubmission(user.id);

  // Increment rate limit
  await incrementRateLimit(clerkId);

  return {
    success: true,
    data: {
      submission: {
        id: submission.id,
        language: submission.language,
        score: submission.score,
        createdAt: submission.createdAt,
      },
      feedback,
      challenge: challengeData
        ? {
            id: challengeData.id,
            title: challengeData.title,
            difficulty: challengeData.difficulty as any,
            description: challengeData.description,
            hints: challengeData.hints as string[],
            language: challengeData.language,
            completed: challengeData.completed,
          }
        : {
  id: 'fallback',
  title: 'Review Your Weaknesses',
  difficulty: 'Intermediate' as const,
  description: `Based on your submission, review: ${(feedback?.weaknesses || []).join(', ')}. Try implementing a small project using these concepts.`,
  hints: ['Identify one pattern', 'Write a small example', 'Refactor your original code'],
  language,
},
    },
  };
}