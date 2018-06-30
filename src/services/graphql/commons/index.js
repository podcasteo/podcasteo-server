import {
  GraphQLScalarType,
} from 'graphql'
import {
  Kind,
} from 'graphql/language'
import {
  GraphQLUpload,
} from 'apollo-upload-server'

export default`
  scalar Date
  scalar Upload

  type File {
    id: ID!
    path: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type PageInfo {
    totalCount: Int,
    pageCount: Int,
    hasNextPage: Boolean,
    hasPreviousPage: Boolean
  }

  type ResolverPayload {
    result: String
  }
`

export const CommonsResolver = { // eslint-disable-line import/prefer-default-export
  Upload: GraphQLUpload,
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return new Date(value) // value sent to the client
    },
    parseLiteral(ast) {
      const date = ast.value

      if (ast.kind === Kind.INT) {
        return parseInt(date, 10) // ast value is always in string format
      }

      return new Date(date).toISOString()
    },
  }),
}
