/**
 * Fetch with exponential backoff retry logic
 * Handles rate limiting (429) and temporary network errors
 */

export interface RetryOptions {
	maxRetries?: number;
	baseDelay?: number;
	maxDelay?: number;
}

export async function fetchWithRetry(
	url: string,
	options: RequestInit = {},
	retryOptions: RetryOptions = {}
): Promise<Response> {
	const { maxRetries = 3, baseDelay = 1000, maxDelay = 10000 } = retryOptions;
	let lastError: Error | null = null;

	for (let attempt = 0; attempt < maxRetries; attempt++) {
		try {
			const response = await fetch(url, options);

			// Handle rate limiting (429)
			if (response.status === 429) {
				const resetTime = response.headers.get('X-RateLimit-Reset');
				let waitMs: number;

				if (resetTime) {
					// Use GitHub's rate limit reset time
					const resetTimestamp = parseInt(resetTime, 10) * 1000;
					waitMs = Math.max(0, resetTimestamp - Date.now());
				} else {
					// Exponential backoff
					waitMs = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
				}

				if (import.meta.env.DEV) {
					console.warn(
						`GitHub rate limited (attempt ${attempt + 1}/${maxRetries}). Waiting ${waitMs}ms`
					);
				}

				if (attempt < maxRetries - 1) {
					await new Promise((resolve) => setTimeout(resolve, waitMs));
					continue;
				}
			}

			// If response is OK or client error (not server error), return it
			if (response.ok || (response.status >= 400 && response.status < 500)) {
				return response;
			}

			// Server error (5xx) - retry
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		} catch (err) {
			lastError = err as Error;

			if (attempt < maxRetries - 1) {
				const waitMs = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
				if (import.meta.env.DEV) {
					console.warn(
						`Fetch failed (attempt ${attempt + 1}/${maxRetries}): ${lastError.message}. Retrying in ${waitMs}ms`
					);
				}
				await new Promise((resolve) => setTimeout(resolve, waitMs));
			}
		}
	}

	throw lastError || new Error('Fetch failed after max retries');
}
