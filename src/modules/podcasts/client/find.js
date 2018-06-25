import isEmpty from 'lodash/isEmpty'

import arango from 'clients/arango'
import podcastAccessor from 'modules/podcasts/client/database/accessor'

export default async (options) => {
  const {
    first,
    offset,
    name,
  } = options
  const searchQuery = isEmpty(name) ? '@@client' : `FULLTEXT(@@client, 'name', 'prefix:${name}')`
  const query = `
    LET data = (
      FOR podcast IN ${searchQuery}
        LIMIT ${offset}, ${first}
        RETURN podcast
    )

    RETURN {
      data: data,
      totalCount: LENGTH(${searchQuery})
    }
  `
  const cursor = await arango.query({
    query,
    bindVars: {
      '@client': podcastAccessor.name,
    },
  })
  const result = await cursor.next()

  result.data = result.data.map((element) => podcastAccessor.serializer.deserialize(element))

  return result
}
