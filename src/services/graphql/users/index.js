import userServices from 'modules/users/services'

export default `
  type User {
    id: String
    email: String
    firstname: String
    lastname: String
    role: UserRole
  }

  enum UserRole {
    USER
    ADMIN
    SUPERADMIN
  }

  extend type Query {
    users: [User]
    user(id: String!): User
  }
`

export const UsersResolver = {
  Query: {
    users: () => userServices.find(),
    user: (root, args) => userServices.findById(args.id),
  },
}
