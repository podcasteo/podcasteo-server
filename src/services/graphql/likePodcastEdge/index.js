import likePodcastServices from 'modules/likePodcastEdge/services'

export default `
  input LikePodcastEdgeInput {
    id: String!
  }

  input DeleteLikePodcastEdgeInput {
    id: String,
    _from: String,
    _to: String,
  }

  type LikePodcastEdge {
    id: String!
    createdAt: Date
    user: User
    podcast: Podcast
  }

  type LikePodcastEdges {
    pageInfo: PageInfo
    data: [LikePodcastEdge]
  }

  extend type Mutation {
    createLikePodcast(input: LikePodcastEdgeInput!): LikePodcastEdge
    deleteLikePodcast(input: DeleteLikePodcastEdgeInput!): ResolverPayload
  }
`

export const LikePodcastEdgeResolver = {
  Mutation: {
    createLikePodcast: (root, args, context) => likePodcastServices.createLikePodcast(args.input.id, context),
    deleteLikePodcast: (root, args, context) => likePodcastServices.deleteLikePodcast(args.input, context),
  },
}
