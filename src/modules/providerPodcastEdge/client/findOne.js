import {
  providerPodcastAccessor,
  providerPodcastEdgeAccessor,
} from 'modules/providerPodcastEdge/client/database/accessor'
import podcastAccessor from 'modules/podcasts/client/database/accessor'
import errMiddleware from 'helpers/errors'

export default async (_toPodcastId, type, createdAt) => {
  let result = {}
  const globalId = `${podcastAccessor.name}/${_toPodcastId}`
  const providerPodcastEdge = await providerPodcastEdgeAccessor.selectWhere({
    _to: globalId,
    type,
    createdAt,
  })

  if (providerPodcastEdge.length < 1) {
    throw errMiddleware.notFound(providerPodcastEdgeAccessor.name, 'provider introuvable')
  } else {
    result = {
      ...providerPodcastEdge[0],
    }
  }

  const providerPodcast = await providerPodcastAccessor.selectWhere({
    id: result._from.split('/')[1],
  })

  if (providerPodcast.length < 1) {
    throw errMiddleware.notFound(providerPodcastAccessor.name, 'provider introuvable')
  } else {
    result.data = providerPodcast[0] // eslint-disable-line prefer-destructuring
  }

  return result
}
