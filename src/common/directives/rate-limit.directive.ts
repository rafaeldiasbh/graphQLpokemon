import { DirectiveLocation, GraphQLDirective, GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import { createRateLimitDirective } from 'graphql-rate-limit';
import { GqlExecutionContext } from '@nestjs/graphql';

// Step 1: Create the rate limit directive
export const rateLimitDirective = createRateLimitDirective({
  identifyContext: (ctx) => {
    console.log('oi');
    const gqlCtx = GqlExecutionContext.create(ctx);
    const req = gqlCtx.getContext().req;
    return req.ip; // Use the client's IP address as the identity
  },
});

// Step 2: Define the directive for NestJS
export const RateLimitDirective = new GraphQLDirective({
  name: 'rateLimit',
  locations: [DirectiveLocation.FIELD_DEFINITION],
  args: {
    max: { type: GraphQLInt },
    window: { type: GraphQLString },
    message: { type: GraphQLString },
    identityArgs: { type: new GraphQLList(GraphQLString) },
    arrayLengthField: { type: GraphQLString },
  },
})