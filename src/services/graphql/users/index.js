import userServices from 'modules/users/services'
import followerServices from 'modules/followUserEdge/services'
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
    isFollower: Boolean
    isFollowing: Boolean
    createdAt: Date
  }

  input CreateUserInput {
    email: String!
    username: String!
    password: String!
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
    updateUser(input: UserInput!): User
  }
`

export const UsersResolver = {
  User: {
    followers: (user, args) => followerServices.findByFollowing(user.id, args),
    following: (user, args) => followerServices.findByFollower(user.id, args),
    isFollower: (user, args, context) => followerServices.isFollower(user.id, context),
    isFollowing: (user, args, context) => followerServices.isFollowing(user.id, context),
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
  },
}
