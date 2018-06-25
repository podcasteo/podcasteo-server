import memberGroupServices from 'modules/memberGroupEdge/services'

export default `
  enum MemberGroupRoleEnum {
    SIMPLE
    ADMINISTRATOR
    SUPERADMINISTRATOR
  }

  enum MemberGroupTypeEnum {
    MEMBER
    PRODUCER
    MANAGER
  }

  input CreateMemberGroupEdgeInput {
    _from: String!
    _to: String!
    role: MemberGroupRoleEnum
    type: MemberGroupTypeEnum
  }

  input DeleteMemberGroupEdgeInput {
    _from: String
    _to: String!
  }

  input UpdateMemberGroupEdgeInput {
    _from: String!
    _to: String!
    role: MemberGroupRoleEnum
    type: MemberGroupTypeEnum
  }

  type MemberGroupEdge {
    id: String!
    createdAt: Date
    role: MemberGroupRoleEnum
    type: MemberGroupTypeEnum
    user: User
    group: Group
  }

  type MemberGroupEdges {
    pageInfo: PageInfo
    data: [MemberGroupEdge]
  }

  extend type Mutation {
    createMemberGroup(input: CreateMemberGroupEdgeInput!): MemberGroupEdge
    deleteMemberGroup(input: DeleteMemberGroupEdgeInput!): ResolverPayload
    updateMemberGroupRole(input: UpdateMemberGroupEdgeInput!): MemberGroupEdge
    updateMemberGroupType(input: UpdateMemberGroupEdgeInput!): MemberGroupEdge
  }
`

export const MemberGroupEdgeResolver = {
  Mutation: {
    createMemberGroup: (root, args, context) => memberGroupServices.createMemberGroup(args.input, context),
    deleteMemberGroup: (root, args, context) => memberGroupServices.deleteMemberGroup(args.input, context),
    updateMemberGroupRole: (root, args, context) => memberGroupServices.updateMemberGroupRole(args.input, context),
    updateMemberGroupType: (root, args, context) => memberGroupServices.updateMemberGroupType(args.input, context),
  },
}
