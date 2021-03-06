import arango from 'clients/arango'
import {
  rankingPodcastAccessor,
  rankingPodcastEdgeAccessor,
} from 'modules/rankingPodcastEdge/client/database/accessor'
import podcastAccessor from 'modules/podcasts/client/database/accessor'

export default async (createdAt, options) => {
  const {
    first,
    offset,
  } = options
  const edgesQuery = `
    FOR edge IN @@edge
      FILTER edge.createdAt == '${createdAt}'
  `
  const query = `
    LET totalCount = LENGTH(
      ${edgesQuery}
      RETURN edge
    )

    LET rankings = (
      ${edgesQuery}
        LET podcast = DOCUMENT(edge._to)
        LET data = DOCUMENT(edge._from)
      RETURN MERGE(
        edge,
        {
          podcast: podcast,
          data: data
        }
      )
    )

    LET result = (
      FOR ranking in rankings
        SORT ranking.data.ranking
        LIMIT ${offset}, ${first}
        RETURN ranking
    )

    RETURN {
      data: result,
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
    data: rankingPodcastAccessor.serializer.deserialize(element.data || {}),
    podcast: podcastAccessor.serializer.deserialize(element.podcast || {}),
  }))

  return result
}
