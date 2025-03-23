// src/common/guards/graphql-rate-limit.guard.ts

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import rateLimit from 'graphql-rate-limit';

@Injectable()
export class GraphQLRateLimitGuard implements CanActivate {
  private rateLimitFn = rateLimit();

  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();
    const handler = context.getHandler();
    const rateLimitOptions = this.reflector.get<{ max: number; window: string }>(
      'rateLimit',
      handler
    );

    if (!rateLimitOptions) return true; // No rate limit → Allow request

    try {
      await this.rateLimitFn(
        { parent: {}, args: req.body.variables, context: { req, ip: req.ip } },
        {},
        rateLimitOptions
      );
      return true;
    } catch (error) {
      throw new Error('Too Many Requests');
    }
  }
}