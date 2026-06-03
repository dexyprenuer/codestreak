import { openrouterHeaders, PRIMARY_MODEL, FALLBACK_MODEL, OPENROUTER_BASE } from '@/lib/openrouter';
import { AnalysisFeedback } from '@/types/analysis';

interface CallOpenRouterOptions {
  prompt: string;
  model?: string;
}

async function callOpenRouter({ prompt, model = PRIMARY_MODEL }: CallOpenRouterOptions): Promise<string> {
  const response = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      ...openrouterHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => 'No error body available');
    throw new Error(`OpenRouter error status [${response.status}]: ${errorBody}`);
  }

  const data = await response.json();
  if (!data?.choices?.[0]?.message?.content) {
    throw new Error('OpenRouter returned an unexpected empty payload structure.');
  }

  return data.choices[0].message.content;
}

export async function analyzeCode(language: string, code: string): Promise<AnalysisFeedback> {
  const prompt = `You are a senior software engineer reviewing code submitted by a junior developer.

Analyze the following ${language} code and return ONLY a valid JSON object. No conversational markdown, no codeblock wrap, no explanation outside the JSON.

JSON shape:
{
  "score": <integer 0-100>,
  "summary": <string, 1-2 sentences>,
  "strengths": [<string>, ...],    // 2-4 items
  "weaknesses": [<string>, ...],   // 2-4 items
  "suggestions": [<string>, ...],  // 2-4 actionable improvements
  "nextTopics": [<string>, ...]    // 2-3 topics to study next
}

Be honest and constructive. Score strictly as an integer between 0 and 100 based on: correctness, readability, efficiency, best practices.

Code:
\`\`\`${language}
${code}
\`\`\``;

  let rawContent = '';

  try {
    console.log(`[CodeStreak AI] Sending request to Primary Model: ${PRIMARY_MODEL}`);
    rawContent = await callOpenRouter({ prompt });
  } catch (primaryError) {
    console.error('[CodeStreak AI] Primary model route failed:', primaryError);
    console.log(`[CodeStreak AI] Attempting fallback model: ${FALLBACK_MODEL}`);
    try {
      rawContent = await callOpenRouter({ prompt, model: FALLBACK_MODEL });
    } catch (fallbackError) {
      console.error('[CodeStreak AI] Fallback model route failed as well:', fallbackError);
      throw new Error('Both primary and fallback AI services failed to analyze code.');
    }
  }

  // Clean and parse the JSON safely
  try {
    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No valid JSON structure found in AI response text');
    
    const parsed = JSON.parse(jsonMatch[0]);

    // BULLETPROOF GUARANTEE: Ensure arrays exist so consumer services don't crash
    return {
      score: typeof parsed.score === 'number' ? parsed.score : 70,
      summary: parsed.summary || 'Code analyzed successfully.',
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
      weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : [],
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
      nextTopics: Array.isArray(parsed.nextTopics) ? parsed.nextTopics : []
    } as AnalysisFeedback;

  } catch (parseError) {
    console.error('[CodeStreak AI] JSON Parse/Sanitization Failure. Raw response was:', rawContent);
    throw new Error('AI response structure was invalid.');
  }
}
