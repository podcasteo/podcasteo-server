import arango from 'clients/arango'
import {
  providerPodcastAccessor,
  providerPodcastEdgeAccessor,
} from 'modules/providerPodcastEdge/client/database/accessor'
import podcastAccessor from 'modules/podcasts/client/database/accessor'

export default async (_toPodcastId) => {
  const globalId = `${podcastAccessor.name}/${_toPodcastId}`
  const query = `
    LET query = (
      FOR edge IN @@edge
        FILTER edge._to == '${globalId}'
        FOR provider IN @@model
          FILTER provider._id == edge._from
          REMOVE provider._key IN @@model
            RETURN OLD
    )

    RETURN {
      result: 'ok'
    }
  `
  const cursor = await arango.query({
    query,
    bindVars: {
      '@edge': providerPodcastEdgeAccessor.name,
      '@model': providerPodcastAccessor.name,
    },
  })

  await cursor.next()
  await providerPodcastEdgeAccessor.deleteWhere({
    _to: `${podcastAccessor.name}/${_toPodcastId}`,
  })

  return {
    result: 'ok',
  }
}
