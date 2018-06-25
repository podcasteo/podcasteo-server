import likeGroupServices from 'modules/likeGroupEdge/services'

export default `
  input LikeGroupEdgeInput {
    id: String!
  }

  input DeleteLikeGroupEdgeInput {
    id: String,
    _from: String,
    _to: String,
  }

  type LikeGroupEdge {
    id: String!
    createdAt: Date
    user: User
    group: Group
  }

  type LikeGroupEdges {
    pageInfo: PageInfo
    data: [LikeGroupEdge]
  }

  extend type Mutation {
    createLikeGroup(input: LikeGroupEdgeInput!): LikeGroupEdge
    deleteLikeGroup(input: DeleteLikeGroupEdgeInput!): ResolverPayload
  }
`

export const LikeGroupEdgeResolver = {
  Mutation: {
    createLikeGroup: (root, args, context) => likeGroupServices.createLikeGroup(args.input.id, context),
    deleteLikeGroup: (root, args, context) => likeGroupServices.deleteLikeGroup(args.input, context),
  },
}
