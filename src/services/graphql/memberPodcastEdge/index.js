import memberPodcastServices from 'modules/memberPodcastEdge/services'

export default `
  enum MemberPodcastRoleEnum {
    SIMPLE
    ADMINISTRATOR
    SUPERADMINISTRATOR
  }

  enum MemberPodcastTypeEnum {
    MEMBER
    PRODUCER
    MANAGER
  }

  input CreateMemberPodcastEdgeInput {
    _from: String!
    _to: String!
    role: MemberPodcastRoleEnum
    type: MemberPodcastTypeEnum
  }

  input DeleteMemberPodcastEdgeInput {
    _from: String
    _to: String!
  }

  input UpdateMemberPodcastEdgeInput {
    _from: String!
    _to: String!
    role: MemberPodcastRoleEnum
    type: MemberPodcastTypeEnum
  }

  type MemberPodcastEdge {
    id: String!
    createdAt: Date
    role: MemberPodcastRoleEnum
    type: MemberPodcastTypeEnum
    user: User
    podcast: Podcast
  }

  type MemberPodcastEdges {
    pageInfo: PageInfo
    data: [MemberPodcastEdge]
  }

  extend type Mutation {
    createMemberPodcast(input: CreateMemberPodcastEdgeInput!): MemberPodcastEdge
    deleteMemberPodcast(input: DeleteMemberPodcastEdgeInput!): ResolverPayload
    updateMemberPodcastRole(input: UpdateMemberPodcastEdgeInput!): MemberPodcastEdge
    updateMemberPodcastType(input: UpdateMemberPodcastEdgeInput!): MemberPodcastEdge
  }
`

export const MemberPodcastEdgeResolver = {
  Mutation: {
    createMemberPodcast: (root, args, context) => memberPodcastServices.createMemberPodcast(args.input, context),
    deleteMemberPodcast: (root, args, context) => memberPodcastServices.deleteMemberPodcast(args.input, context),
    updateMemberPodcastRole: (root, args, context) => memberPodcastServices.updateMemberPodcastRole(args.input, context),
    updateMemberPodcastType: (root, args, context) => memberPodcastServices.updateMemberPodcastType(args.input, context),
  },
}
