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

  input CreateMemberGoupEdgeInput {
    _from: String!
    _to: String!
    role: MemberGroupRoleEnum
    type: MemberGroupTypeEnum
  }

  input DeleteMemberGoupEdgeInput {
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
    createMemberGroup(input: CreateMemberGoupEdgeInput!): MemberGroupEdge
    deleteMemberGroup(input: DeleteMemberGoupEdgeInput!): ResolverPayload
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
