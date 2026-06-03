import { openrouterHeaders, PRIMARY_MODEL, OPENROUTER_BASE } from '@/lib/openrouter';
import { ChallengeData } from '@/types/analysis';

export async function generateChallenge(
  language: string,
  score: number,
  weaknesses: string[] = [] // SAFETynet: Defaults to empty array if missing
): Promise<Omit<ChallengeData, 'id' | 'completed'>> {
  
  // SAFETynet: Ensure weaknesses is treated as an array even if undefined slips through
  const safeWeaknesses = Array.isArray(weaknesses) ? weaknesses : [];

  const prompt = `You are a coding coach generating a personalized challenge for a developer.

Context:
- Language: ${language}
- Their score: ${score}/100
- Their weaknesses: ${safeWeaknesses.length > 0 ? safeWeaknesses.join(', ') : 'General syntax optimization'}

Generate a coding challenge appropriate for their level and return ONLY a valid JSON object. No markdown code blocks, no trailing conversational text.

JSON shape:
{
  "title": <string>,
  "difficulty": <"Beginner" | "Intermediate" | "Advanced">,
  "description": <string, full problem statement, 3-5 sentences>,
  "hints": [<string>, <string>, <string>]   // exactly 3 progressive hints
}

Make the challenge directly address one of their weaknesses. Be specific and practical.`;

  const response = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      ...openrouterHeaders,
      'Content-Type': 'application/json', // Explicit header safety
    },
    body: JSON.stringify({
      model: PRIMARY_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
      max_tokens: 1500,
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`OpenRouter error: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error('Challenge generation received an empty content payload.');

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No valid JSON structure found in response');

  try {
    const parsed = JSON.parse(jsonMatch[0]);
    return {
      title: parsed.title || 'CodeStreak Code Challenge',
      difficulty: parsed.difficulty || 'Intermediate',
      description: parsed.description || 'Implement optimizations to improve structural integrity and clean up code execution pathing.',
      hints: Array.isArray(parsed.hints) ? parsed.hints : ['Review standard practices.', 'Break problems into pieces.', 'Refactor step-by-step.'],
      language,
    };
  } catch (parseError) {
    throw new Error('Failed to parse challenge configuration data payload.');
  }
}
