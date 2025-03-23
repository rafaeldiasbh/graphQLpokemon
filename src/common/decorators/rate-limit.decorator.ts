
import { SetMetadata } from '@nestjs/common';

/**
 * Custom decorator to apply GraphQL rate limiting in code-first approach.
 */
export const RateLimit = (max: number, window: string) =>
  SetMetadata('rateLimit', { max, window });