import followUserServices from 'modules/followUserEdge/services'

export default `
  input FollowUserEdgeInput {
    id: String!
  }

  input DeleteFollowUserEdgeInput {
    id: String,
    _from: String,
    _to: String,
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

export const FollowUserEdgeResolver = {
  Mutation: {
    createFollowUser: (root, args, context) => followUserServices.createFollowUser(args.input.id, context),
    deleteFollowUser: (root, args, context) => followUserServices.deleteFollowUser(args.input, context),
  },
}
