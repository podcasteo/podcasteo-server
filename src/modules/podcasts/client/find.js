import isEmpty from 'lodash/isEmpty'

import arango from 'clients/arango'
import podcastAccessor from 'modules/podcasts/client/database/accessor'

export default async (options) => {
  const {
    first,
    offset,
    haveLeadWomen,
    haveWomen,
    isPodcasteo,
    name,
  } = options
  const searchQuery = isEmpty(name) ? '@@client' : `FULLTEXT(@@client, 'name', 'prefix:${name}')`
  const query = `
    LET query = (
      FOR podcast IN ${searchQuery}
      ${isPodcasteo ? 'FILTER podcast.isPodcasteo == true' : ''}
      ${haveWomen ? 'FILTER podcast.haveWomen == true' : ''}
      ${haveLeadWomen ? 'FILTER podcast.haveLeadWomen == true' : ''}
        RETURN podcast
    )

    Let data = (
      FOR podcast IN query
        LIMIT ${offset}, ${first}
        RETURN podcast
    )

    RETURN {
      data: data,
      totalCount: LENGTH(query)
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
