import podcastServices from 'modules/podcasts/services'
import likePodcastServices from 'modules/likePodcastEdge/services'
import memberPodcastServices from 'modules/memberPodcastEdge/services'
import providerPodcastServices from 'modules/providerPodcastEdge/services'
import rankingPodcastServices from 'modules/rankingPodcastEdge/services'

export default `
  type Podcasts {
    data: [Podcast]
    pageInfo: PageInfo
  }

  type Podcast {
    id: String
    name: String
    slug: String
    description: String
    avatar: String
    facebook: String
    twitter: String
    soundcloud: String
    itunes: String
    likes(first: Int, offset: Int): LikePodcastEdges
    members(first: Int, offset: Int): MemberPodcastEdges
    provider(first: Int, offset: Int, type: ProviderPodcastTypeEnum!): ProviderPodcastEdges
    rankings(first: Int, offset: Int): RankingPodcastEdges
    isLike: Boolean
    isMember: Boolean
    membership: MemberPodcastEdge
    createdAt: Date
  }

  input CreatePodcastInput {
    id: String
    name: String!
    slug: String
    description: String
    avatar: String
    facebook: String
    twitter: String
    soundcloud: String
    itunes: String
  }

  input PodcastInput {
    id: String!
    name: String
    slug: String
    description: String
    avatar: String
    facebook: String
    twitter: String
    soundcloud: String
    itunes: String
  }

  extend type Query {
    podcasts(first: Int, offset: Int, name: String): Podcasts
    podcast(id: String, slug: String): Podcast
  }

  extend type Mutation {
    createPodcast(input: CreatePodcastInput!): Podcast
    updatePodcast(input: PodcastInput!): Podcast
    deletePodcast(input: PodcastInput!): ResolverPayload
  }
`

export const PodcastsResolver = {
  Podcast: {
    likes: (podcast, args) => likePodcastServices.findByPodcast(podcast.id, args),
    members: (podcast, args) => memberPodcastServices.findByPodcast(podcast.id, args),
    provider: (podcast, args) => providerPodcastServices.find(podcast.id, args),
    isLike: (podcast, args, context) => likePodcastServices.isLike(podcast.id, context),
    isMember: (podcast, args, context) => memberPodcastServices.isMember(podcast.id, context),
    membership: (podcast, args, context) => memberPodcastServices.findMembership(podcast.id, context),
    rankings: (podcast, args) => rankingPodcastServices.findByPodcast(podcast.id, args),
  },
  Query: {
    podcasts: (root, args) => podcastServices.find(args),
    podcast: (root, args) => podcastServices.findOne(args),
  },
  Mutation: {
    createPodcast: (root, args, context) => podcastServices.createPodcast(args.input, context),
    deletePodcast: (root, args, context) => podcastServices.deletePodcast(args.input.id, context),
    updatePodcast: (root, args, context) => podcastServices.updatePodcast(args.input.id, args.input, context),
  },
}
