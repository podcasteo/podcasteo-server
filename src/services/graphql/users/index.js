import userServices from 'modules/users/services'
import followUserServices from 'modules/followUserEdge/services'
import likeGroupServices from 'modules/likeGroupEdge/services'
import memberGroupServices from 'modules/memberGroupEdge/services'
import likePodcastServices from 'modules/likePodcastEdge/services'
import memberPodcastServices from 'modules/memberPodcastEdge/services'
import authentification from 'helpers/authentification'

export default `
  enum UserRole {
    USER
    ADMINISTRATOR
    SUPERADMINISTRATOR
  }

  type Users {
    data: [User]
    pageInfo: PageInfo
  }

  type User {
    id: String
    email: String
    username: String
    avatar: String
    description: String
    firstname: String
    lastname: String
    birthday: Date
    facebook: String
    twitter: String
    soundcloud: String
    itunes: String
    role: UserRole
    following(first: Int, offset: Int): FollowUserEdges
    followers(first: Int, offset: Int): FollowUserEdges
    likeGroups(first: Int, offset: Int): LikeGroupEdges
    memberGroups(first: Int, offset: Int): MemberGroupEdges
    likePodcasts(first: Int, offset: Int): LikePodcastEdges
    memberPodcasts(first: Int, offset: Int): MemberPodcastEdges
    isFollower: Boolean
    isFollowing: Boolean
    createdAt: Date
  }

  input CreateUserInput {
    email: String!
    username: String!
    password: String!
  }

  input FacebookInput {
    email: String!
    facebookId: String!
    username: String
    firstname: String
    lastname: String
  }

  input UserInput {
    id: String!
    username: String
    description: String
    firstname: String
    lastname: String
    birthday: Date
    facebook: String
    twitter: String
    soundcloud: String
    itunes: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type LoginPayload {
    token: String
  }

  extend type Query {
    users(first: Int, offset: Int, username: String): Users
    user(id: String, email: String): User
    self: User
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): LoginPayload
    deleteUser(input: UserInput!): ResolverPayload
    login(input: LoginInput!): LoginPayload
    handleFacebook(input: FacebookInput!): LoginPayload
    updateUser(input: UserInput!): User
  }
`

export const UsersResolver = {
  User: {
    followers: (user, args) => followUserServices.findByFollowing(user.id, args),
    following: (user, args) => followUserServices.findByFollower(user.id, args),
    isFollower: (user, args, context) => followUserServices.isFollower(user.id, context),
    isFollowing: (user, args, context) => followUserServices.isFollowing(user.id, context),
    likeGroups: (user, args) => likeGroupServices.findByUser(user.id, args),
    memberGroups: (user, args) => memberGroupServices.findByUser(user.id, args),
    likePodcasts: (user, args) => likePodcastServices.findByUser(user.id, args),
    memberPodcasts: (user, args) => memberPodcastServices.findByUser(user.id, args),
  },
  Query: {
    users: (root, args) => userServices.find(args),
    user: (root, args) => userServices.findOne(args),
    self: (root, args, context) => authentification.handleUser(context),
  },
  Mutation: {
    createUser: (root, args) => userServices.createUser(args.input),
    deleteUser: (root, args, context) => userServices.deleteUser(args.input.id, context),
    updateUser: (root, args, context) => userServices.updateUser(args.input.id, args.input, context),
    login: (root, args) => userServices.login(args.input),
    handleFacebook: (root, args) => userServices.handleFacebookUser(args.input),
  },
}
