import {
  makeExecutableSchema,
} from 'graphql-tools'

import Commons, {
  CommonsResolver,
} from 'services/graphql/commons'
import Users, {
  UsersResolver,
} from 'services/graphql/users'
import FollowUserEdges, {
  FollowUserEdgesResolver,
} from 'services/graphql/followUserEdge'

const Root = `
  type Query {
    keep: Boolean
  }

  type Mutation {
    keep: Boolean
  }
`
const RootResolver = {
  Query: {
    keep: () => true,
  },
  Mutation: {
    keep: () => true,
  },
}

export default makeExecutableSchema({
  typeDefs: [
    // Root
    Root,
    // Commons,
    Commons,
    // Users
    Users,
    FollowUserEdges,
  ],
  resolvers: [
    // Root
    RootResolver,
    // Commons
    CommonsResolver,
    // Users
    UsersResolver,
    FollowUserEdgesResolver,
  ],
})
