import isEmpty from 'lodash/isEmpty'

import arango from 'clients/arango'
import groupAccessor from 'modules/groups/client/database/accessor'

export default async (options) => {
  const {
    first,
    offset,
    name,
  } = options
  const searchQuery = isEmpty(name) ? '@@client' : `FULLTEXT(@@client, 'name', 'prefix:${name}')`
  const query = `
    LET data = (
      FOR group IN ${searchQuery}
        LIMIT ${offset}, ${first}
        RETURN group
    )

    RETURN {
      data: data,
      totalCount: LENGTH(${searchQuery})
    }
  `
  const cursor = await arango.query({
    query,
    bindVars: {
      '@client': groupAccessor.name,
    },
  })
  const result = await cursor.next()

  result.data = result.data.map((element) => groupAccessor.serializer.deserialize(element))

  return result
}
