import {
  rankingPodcastAccessor,
  rankingPodcastEdgeAccessor,
} from 'modules/rankingPodcastEdge/client/database/accessor'
import podcastAccessor from 'modules/podcasts/client/database/accessor'
import errMiddleware from 'helpers/errors'

export default async (_toPodcastId, createdAt) => {
  let result = {}
  const globalId = `${podcastAccessor.name}/${_toPodcastId}`
  const rankingPodcastEdge = await rankingPodcastEdgeAccessor.selectWhere({
    _to: globalId,
    createdAt,
  })

  if (rankingPodcastEdge.length < 1) {
    throw errMiddleware.notFound(rankingPodcastEdgeAccessor.name, 'classement introuvable')
  } else {
    result = {
      ...rankingPodcastEdge[0],
    }
  }

  const rankingPodcast = await rankingPodcastAccessor.selectWhere({
    id: result._from.split('/')[1],
  })

  if (rankingPodcast.length < 1) {
    throw errMiddleware.notFound(rankingPodcastAccessor.name, 'classement introuvable')
  } else {
    result.data = rankingPodcast[0] // eslint-disable-line prefer-destructuring
  }

  return result
}
