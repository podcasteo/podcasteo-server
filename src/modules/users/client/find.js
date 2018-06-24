import isEmpty from 'lodash/isEmpty'

import arango from 'clients/arango'
import userAccessor from 'modules/users/client/database/accessor'

export default async (options) => {
  const {
    first,
    offset,
    username,
  } = options
  const searchQuery = isEmpty(username) ? '@@client' : `FULLTEXT(@@client, 'username', 'prefix:${username}')`
  const query = `
    LET data = (
      FOR user IN ${searchQuery}
        LIMIT ${offset}, ${first}
        RETURN user
    )

    RETURN {
      data: data,
      totalCount: LENGTH(${searchQuery})
    }
  `
  const cursor = await arango.query({
    query,
    bindVars: {
      '@client': userAccessor.name,
    },
  })
  const result = await cursor.next()

  result.data = result.data.map((element) => userAccessor.serializer.deserialize(element))

  return result
}
