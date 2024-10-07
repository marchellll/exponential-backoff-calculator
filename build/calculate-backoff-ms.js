"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcBackoffMs = calcBackoffMs;
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
function calcBackoffMs({ attempt = 0, baseTimeMs = 1000, maxTimeMs = 86400000, maxAttempts = 10, randomizationFactor = 0.25, }) {
    // If attempt is less than or equal to 0, no backoff is needed
    if (attempt <= 0) {
        return 0;
    }
    // If we've exceeded the maximum number of attempts, return the max backoff time
    if (attempt > maxAttempts) {
        return maxTimeMs;
    }
    // Calculate the exponential backoff time
    const backoffTime = baseTimeMs * 2 ** (attempt - 1);
    // Apply a randomization factor to the backoff time
    const randomization = Math.random() * randomizationFactor * backoffTime;
    // Return the minimum of the backoff time plus randomization or the maximum allowed time
    return Math.min(backoffTime + randomization, maxTimeMs);
}
//# sourceMappingURL=calculate-backoff-ms.js.map