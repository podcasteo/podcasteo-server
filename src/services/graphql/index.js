import {
  makeExecutableSchema,
} from 'graphql-tools'

import Commons, {
  CommonsResolver,
} from 'services/graphql/commons'
import Users, {
  UsersResolver,
} from 'services/graphql/users'
import FollowUserEdge, {
  FollowUserEdgeResolver,
} from 'services/graphql/followUserEdge'
import Groups, {
  GroupsResolver,
} from 'services/graphql/groups'
import LikeGroupEdge, {
  LikeGroupEdgeResolver,
} from 'services/graphql/likeGroupEdge'
import MemberGroupEdge, {
  MemberGroupEdgeResolver,
} from 'services/graphql/memberGroupEdge'

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
    FollowUserEdge,
    // Groups
    Groups,
    LikeGroupEdge,
    MemberGroupEdge,
  ],
  resolvers: [
    // Root
    RootResolver,
    // Commons
    CommonsResolver,
    // Users
    UsersResolver,
    FollowUserEdgeResolver,
    // Groups
    GroupsResolver,
    LikeGroupEdgeResolver,
    MemberGroupEdgeResolver,
  ],
})
