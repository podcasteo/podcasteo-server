import arango from 'clients/arango'
import {
  rankingPodcastAccessor,
  rankingPodcastEdgeAccessor,
} from 'modules/rankingPodcastEdge/client/database/accessor'
import podcastAccessor from 'modules/podcasts/client/database/accessor'

export default async (_toPodcastId) => {
  const globalId = `${podcastAccessor.name}/${_toPodcastId}`
  const query = `
    LET query = (
      FOR edge IN @@edge
        FILTER edge._to == '${globalId}'
        FOR ranking IN @@model
          FILTER ranking._id == edge._from
          REMOVE ranking._key IN @@model
            RETURN OLD
    )

    RETURN {
      result: 'ok'
    }
  `
  const cursor = await arango.query({
    query,
    bindVars: {
      '@edge': rankingPodcastEdgeAccessor.name,
      '@model': rankingPodcastAccessor.name,
    },
  })

  await cursor.next()
  await rankingPodcastEdgeAccessor.deleteWhere({
    _to: `${podcastAccessor.name}/${_toPodcastId}`,
  })

  return {
    result: 'ok',
  }
}
