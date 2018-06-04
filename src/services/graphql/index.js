import {
  makeExecutableSchema,
} from 'graphql-tools'

import Users, {
  UsersResolver,
} from 'services/graphql/users'

const Root = `
  type Query {
    keep: Boolean
  }

  type Mutation {
    keep: Boolean
  }
`

export default makeExecutableSchema({
  typeDefs: [
    // Root
    Root,

    // Users
    Users,
  ],
  resolvers: [

    // Users
    UsersResolver,

    // Query
    {
      Query: {
        keep: () => true,
      },
    },
  ],
})
