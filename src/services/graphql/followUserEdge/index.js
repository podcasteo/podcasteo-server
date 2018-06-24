import followServices from 'modules/followUserEdge/services'

export default `
  input FollowUserEdgeInput {
    id: String!
  }

  input DeleteFollowUserEdgeInput {
    id: String,
    from: String,
    to: String,
  }

  type FollowUserEdge {
    id: String!
    createdAt: Date
    user: User
  }

  type FollowUserEdges {
    pageInfo: PageInfo
    data: [FollowUserEdge]
  }

  extend type Mutation {
    createFollowUser(input: FollowUserEdgeInput!): FollowUserEdge
    deleteFollowUser(input: DeleteFollowUserEdgeInput!): ResolverPayload
  }
`

export const FollowUserEdgesResolver = {
  Mutation: {
    createFollowUser: (root, args, context) => followServices.createFollowUser(args.input.id, context),
    deleteFollowUser: (root, args, context) => followServices.deleteFollowUser(args.input, context),
  },
}
