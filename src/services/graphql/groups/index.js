import groupServices from 'modules/groups/services'
import likeGroupServices from 'modules/likeGroupEdge/services'
import memberGroupServices from 'modules/memberGroupEdge/services'
import getAvatar from 'helpers/getAvatar'

export default `
  type Groups {
    data: [Group]
    pageInfo: PageInfo
  }

  type Group {
    id: String
    name: String
    slug: String
    description: String
    avatar: String
    facebook: String
    twitter: String
    soundcloud: String
    itunes: String
    likes(first: Int, offset: Int): LikeGroupEdges
    members(first: Int, offset: Int): MemberGroupEdges
    isLike: Boolean
    isMember: Boolean
    membership: MemberGroupEdge
    createdAt: Date
  }

  input CreateGroupInput {
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

  input GroupInput {
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
    groups(first: Int, offset: Int, name: String): Groups
    group(id: String, slug: String): Group
  }

  extend type Mutation {
    createGroup(input: CreateGroupInput!): Group
    updateGroup(input: GroupInput!): Group
    deleteGroup(input: GroupInput!): ResolverPayload
    uploadGroupAvatar(id: String!, file: Upload!): Group
  }
`

export const GroupsResolver = {
  Group: {
    avatar: (group) => getAvatar('groups', group),
    likes: (group, args) => likeGroupServices.findByGroup(group.id, args),
    members: (group, args) => memberGroupServices.findByGroup(group.id, args),
    isLike: (group, args, context) => likeGroupServices.isLike(group.id, context),
    isMember: (group, args, context) => memberGroupServices.isMember(group.id, context),
    membership: (group, args, context) => memberGroupServices.findMembership(group.id, context),
  },
  Query: {
    groups: (root, args) => groupServices.find(args),
    group: (root, args) => groupServices.findOne(args),
  },
  Mutation: {
    createGroup: (root, args, context) => groupServices.createGroup(args.input, context),
    deleteGroup: (root, args, context) => groupServices.deleteGroup(args.input.id, context),
    updateGroup: (root, args, context) => groupServices.updateGroup(args.input.id, args.input, context),
    uploadGroupAvatar: (root, args, context) => groupServices.uploadAvatarFromGraphQL(args.id, args.file, context),
  },
}
