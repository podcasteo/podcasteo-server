import arango from 'clients/arango'
import {
  rankingPodcastAccessor,
  rankingPodcastEdgeAccessor,
} from 'modules/rankingPodcastEdge/client/database/accessor'
import podcastAccessor from 'modules/podcasts/client/database/accessor'

export default async (_toPodcastId, options) => {
  const {
    first,
    offset,
  } = options
  const globalId = `${podcastAccessor.name}/${_toPodcastId}`
  const edgesQuery = `
    FOR ranking, edge IN 1 INBOUND toPodcast @@edge
      SORT edge.createdAt DESC
  `
  const query = `
    LET toPodcast = DOCUMENT('${globalId}')

    LET totalCount = LENGTH(
      ${edgesQuery}
      RETURN ranking
    )

    LET data = (
      ${edgesQuery}
        LIMIT ${offset}, ${first}
      RETURN MERGE(
        edge,
        {
          data: ranking
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
      '@edge': rankingPodcastEdgeAccessor.name,
    },
  })
  const result = await cursor.next()

  result.data = result.data.map((element) => ({
    ...rankingPodcastEdgeAccessor.serializer.deserialize(element),
    data: rankingPodcastAccessor.serializer.deserialize(element.data),
  }))

  return result
}
