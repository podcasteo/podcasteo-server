import arango from 'clients/arango'
import {
  providerPodcastAccessor,
  providerPodcastEdgeAccessor,
} from 'modules/providerPodcastEdge/client/database/accessor'
import podcastAccessor from 'modules/podcasts/client/database/accessor'

export default async (_toPodcastId, options) => {
  const {
    first,
    offset,
    type,
  } = options
  const globalId = `${podcastAccessor.name}/${_toPodcastId}`
  const edgesQuery = `
    FOR provider, edge IN 1 INBOUND toPodcast @@edge
      SORT edge.createdAt DESC
      ${type ? `FILTER edge.type == '${type}'` : ''}
  `
  const query = `
    LET toPodcast = DOCUMENT('${globalId}')

    LET totalCount = LENGTH(
      ${edgesQuery}
      RETURN provider
    )

    LET data = (
      ${edgesQuery}
        LIMIT ${offset}, ${first}
      RETURN MERGE(
        edge,
        {
          data: provider
        }
      )
    )

    RETURN {
      data: data,
      totalCount: totalCount
    }
  `
  const cursor = await arango.query({
    query,
    bindVars: {
      '@edge': providerPodcastEdgeAccessor.name,
    },
  })
  const result = await cursor.next()

  result.data = result.data.map((element) => ({
    ...providerPodcastEdgeAccessor.serializer.deserialize(element),
    data: providerPodcastAccessor.serializer.deserialize(element.data),
  }))

  return result
}
