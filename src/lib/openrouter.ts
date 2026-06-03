export const OPENROUTER_BASE = 'https://openrouter.ai/api/v1';

/**
 * PRIMARY MODEL: Qwen3 Coder
 * Why: The absolute best free coding model available. With a massive 1.0M context window, 
 * it can analyze massive files/codebases and understands code syntax better than anything else here.
 */
export const PRIMARY_MODEL = 'qwen/qwen3-coder:free';

/**
 * FALLBACK MODEL: Liquid LFM 2.5 Thinking
 * Why: A dedicated reasoning model. Perfect for your fallback loop when the primary 
 * model fails or when a user encounters a highly complex logic bug that requires "thinking" cycles.
 */
export const FALLBACK_MODEL = 'liquid/lfm-2.5-1.2b-thinking:free';

// ALTERNATIVE PRIMARY OPTION:
// If you want OpenRouter to dynamically cycle through all 22 models based on load, use:
// export const PRIMARY_MODEL = 'openrouter/free';

export const openrouterHeaders = {
  'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
  'HTTP-Referer': 'http://localhost:3000',
  'X-Title': 'CodeStreak',
};
