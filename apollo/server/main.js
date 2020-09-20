import { createApolloServer } from "meteor/apollo";
import { makeExecutableSchema } from "graphql-tools";

import ResolutionsSchema from "../imports/api/resolutions/Resolutions.graphql";
import UsersSchema from "../imports/api/users/User.graphql";
import GoalsSchema from "../imports/api/goals/Goal.graphql";

import ResolutionsResolvers from "../imports/api/resolutions/resolvers";
import UsersResolvers from "../imports/api/users/resolvers";
import GoalsResolvers from "../imports/api/goals/resolvers";

import merge from "lodash/merge";

// hello

const typeDefs = [GoalsSchema, ResolutionsSchema, UsersSchema];

const resolvers = merge(GoalsResolvers, ResolutionsResolvers, UsersResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

createApolloServer({ schema });
