import {
  GraphQLScalarType,
} from 'graphql'
import {
  Kind,
} from 'graphql/language'

export default`
  scalar Date

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
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10) // ast value is always in string format
      }

      return null
    },
  }),
}
