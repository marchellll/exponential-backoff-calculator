
Exponential Backoff with Randomization

`calcBackoffMs` is a utility function that calculates exponential backoff time with optional randomization. It is often used in retry mechanisms for network requests, where retrying after increasing delays can improve reliability and prevent server overloads.

## Features

- **Exponential backoff**: Delay increases exponentially with each retry.
- **Randomization**: Adds variability to the delay to avoid congestion from simultaneous retries.
- **Configurable options**: Allows customizations such as the base time, maximum time, number of attempts, and randomization factor.

## Installation

```bash
npm install exponential-backoff-calculator
```

## Usage

### Simple Usage

The simplest use case involves calculating a backoff time using only the `attempt` parameter. The default values will be applied for the rest:

- `baseTimeMs = 1000` (1 second)
- `maxTimeMs = 86400000` (24 hours)
- `maxAttempts = 10`
- `randomizationFactor = 0.25`

```ts
import { calcBackoffMs } from 'calc-backoff-ms';
// OR
const { calcBackoffMs } = require('calc-backoff-ms');

// Example: Retry attempt #3
const backoffTime = calcBackoffMs({ attempt: 3 });
console.log(backoffTime); // Backoff time in milliseconds, with randomization
```

In this example, the backoff time will be based on the third retry with a base time of 1 second, doubled with each retry.

### Advanced Usage

For more control over the retry mechanism, you can customize all the options:

- `baseTimeMs`: Set the base retry time in milliseconds.
- `maxTimeMs`: Set the maximum allowable time for any retry.
- `maxAttempts`: Set the maximum number of retry attempts.
- `randomizationFactor`: Add a random factor to make the backoff time less predictable.

```ts
import { calcBackoffMs } from 'calc-backoff-ms';

// Custom configuration for advanced retry strategy
const options = {
  attempt: 5,                // Retry attempt #5
  baseTimeMs: 500,           // Base time of 500ms
  maxTimeMs: 60000,          // Max backoff time capped at 1 minute (60000ms)
  maxAttempts: 8,            // Maximum 8 retry attempts, when attempt>8, return maxTimeMs
  randomizationFactor: 0.1,  // 10% randomization factor
};

const backoffTime = calcBackoffMs(options);
console.log(backoffTime); // Backoff time in milliseconds, with randomization
```

## Function Details

### `calcBackoffMs(options: BackoffOptions): number`

Calculates an exponential backoff time, optionally applying a randomization factor. The time increases exponentially based on the retry `attempt` and is randomized if a `randomizationFactor` is provided.

### Parameters

| Parameter            | Type     | Default       | Description                                                                         |
|----------------------|----------|---------------|-------------------------------------------------------------------------------------|
| `attempt`            | `number` | `0`           | The current attempt count (starts from 0).                                          |
| `baseTimeMs`         | `number` | `1000`        | The base time in milliseconds for the first retry (second attempt).                 |
| `maxTimeMs`          | `number` | `86400000`    | The maximum backoff time in milliseconds (default: 24 hours).                       |
| `maxAttempts`        | `number` | `10`          | The maximum number of retry attempts allowed. When attempt>maxAttempts, return maxTimeMs.                                       |
| `randomizationFactor`| `number` | `0.25`        | The randomization factor to add variability to the backoff time (e.g., 25% randomization). |

### Returns
- **`number`**: The calculated backoff time in milliseconds.

## Example Scenarios

### Scenario 1: Basic Retry Logic

You want to retry a network request up to 3 times, with increasing delay times:

```ts
for (let i = 0; i <= 3; i++) {
  const backoff = calcBackoffMs({ attempt: i });
  console.log(`Attempt ${i}, waiting for ${backoff}ms before retrying...`);
  // await new Promise(resolve => setTimeout(resolve, backoff));
}
// result:
// Attempt 0, waiting for 0ms before retrying...
// Attempt 1, waiting for 1066.8449541477153ms before retrying...
// Attempt 2, waiting for 2159.749647634612ms before retrying...
// Attempt 3, waiting for 4116.148952398919ms before retrying...
```

```ts
for (let i = 0; i <= 3; i++) {
  // with randomization
  const backoff = calcBackoffMs({ attempt: i, randomizationFactor: 0 });
  console.log(`Attempt ${i}, waiting for ${backoff}ms before retrying...`);
}
// result:
// Attempt 0, waiting for 0ms before retrying...
// Attempt 1, waiting for 1000ms before retrying...
// Attempt 2, waiting for 2000ms before retrying...
// Attempt 3, waiting for 4000ms before retrying...
```

### Scenario 2: Custom Retry with Maximum Cap

You have a case where you want the backoff time to never exceed 10 seconds:

```ts
for (let i = 0; i <= 10; i++) {
  const backoff = calcBackoffMs({
    attempt: i,
    baseTimeMs: 500,   // Start with a base time of 500ms
    maxTimeMs: 10000,  // Cap at 10 seconds
  });
  console.log(`Attempt ${i}, waiting for ${backoff}ms before retrying...`);
}

// result:
// Attempt 0, waiting for 0ms before retrying...
// Attempt 1, waiting for 546.2768833801952ms before retrying...
// Attempt 2, waiting for 1172.9205830996186ms before retrying...
// Attempt 3, waiting for 2026.2255004430747ms before retrying...
// Attempt 4, waiting for 4121.822671646223ms before retrying...
// Attempt 5, waiting for 8884.123656347007ms before retrying...
// Attempt 6, waiting for 10000ms before retrying...
// Attempt 7, waiting for 10000ms before retrying...
// Attempt 8, waiting for 10000ms before retrying...
// Attempt 9, waiting for 10000ms before retrying...
// Attempt 10, waiting for 10000ms before retrying...
```

### Scenario 3: Handling Large Networks

For large-scale distributed systems, it's useful to apply a randomization factor to avoid all retries happening at the same time:

```ts
const backoff = calcBackoffMs({
  attempt: 4,
  randomizationFactor: 0.5, // 50% randomization to distribute retries
});
console.log(`Backoff time with randomization: ${backoff}ms`);
```

## License

This project is licensed under the MIT License.
