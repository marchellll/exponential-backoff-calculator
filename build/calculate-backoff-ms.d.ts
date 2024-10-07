/**
 * Calculates the exponential backoff time with optional randomization.
 *
 * @param {BackoffOptions} options - The options for configuring the backoff time.
 * @param {number} [options.attempt=0] - The current attempt number (starts from 0).
 * @param {number} [options.baseTimeMs=1000] - The base time (in milliseconds) for the first retry (second attempt).
 * @param {number} [options.maxTimeMs=86400000] - The maximum backoff time (in milliseconds).
 * @param {number} [options.maxAttempts=10] - The maximum number of attempts.
 * @param {number} [options.randomizationFactor=0.25] - The randomization factor to add some variability to the backoff time.
 * @returns {number} - The calculated backoff time in milliseconds, randomized if applicable.
 */
export declare function calcBackoffMs({ attempt, baseTimeMs, maxTimeMs, maxAttempts, randomizationFactor, }: BackoffOptions): number;
/**
 * Options for configuring the backoff calculation.
 */
type BackoffOptions = {
    /** The current attempt number (default: 0). */
    attempt?: number;
    /** The base time in milliseconds for the initial backoff (default: 1000). */
    baseTimeMs?: number;
    /** The maximum allowable backoff time in milliseconds (default: 86400000, which is 24 hours). */
    maxTimeMs?: number;
    /** The maximum number of retry attempts (default: 10). */
    maxAttempts?: number;
    /** The randomization factor to apply to the backoff time (default: 0.25). */
    randomizationFactor?: number;
};
export {};
//# sourceMappingURL=calculate-backoff-ms.d.ts.map