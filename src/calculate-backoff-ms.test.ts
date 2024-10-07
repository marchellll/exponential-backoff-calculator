import { calcBackoffMs } from './calculate-backoff-ms';

describe('calcBackoffMs', () => {
  it('should correctly calculate the backoff time for the first attempt', () => {
    // Test the base case with the default options, without randomization
    expect(calcBackoffMs({
      randomizationFactor: 0,
    })).toBe(0);
  });

  it('should correctly calculate the backoff time for the max attempt', () => {
    // Test the maximum case with the default options, without randomization
    expect(calcBackoffMs({
      attempt: 1000,
      randomizationFactor: 0,
    })).toBe(86400000);
  });

  it('should correctly calculate the backoff time with default randomizationFactor', () => {
    // Test the maximum case with the default options
    const result = calcBackoffMs({
      attempt: 1,
    });
    expect(result).toBeGreaterThanOrEqual(1000);
    expect(result).toBeLessThanOrEqual(1250);
  });

  it('should capped to maxTimeMs', () => {
    // Test the maximum case with the default options
    const result = calcBackoffMs({
      attempt: 99999,
      maxTimeMs: 0,
    });
    expect(result).toBe(0);
  });

  it('should return baseTimeMs on second attemt', () => {
    // Test the maximum case with the default options
    const result = calcBackoffMs({
      attempt: 1,
      baseTimeMs: 1,
      randomizationFactor: 0,
    });
    expect(result).toBe(1);
  });
});