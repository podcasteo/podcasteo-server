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
import Podcasts, {
  PodcastsResolver,
} from 'services/graphql/podcasts'
import LikePodcastEdge, {
  LikePodcastEdgeResolver,
} from 'services/graphql/likePodcastEdge'
import MemberPodcastEdge, {
  MemberPodcastEdgeResolver,
} from 'services/graphql/memberPodcastEdge'
import ProviderPodcastEdge from 'services/graphql/providerPodcastEdge'

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
    // Podcasts
    Podcasts,
    LikePodcastEdge,
    MemberPodcastEdge,
    ProviderPodcastEdge,
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
    // Podcast
    PodcastsResolver,
    LikePodcastEdgeResolver,
    MemberPodcastEdgeResolver,
  ],
})
