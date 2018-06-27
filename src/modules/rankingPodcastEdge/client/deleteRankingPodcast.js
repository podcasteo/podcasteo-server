import {
  rankingPodcastAccessor,
  rankingPodcastEdgeAccessor,
} from 'modules/rankingPodcastEdge/client/database/accessor'

export default async (_fromRankingPodcastId) => {
  await rankingPodcastAccessor.deleteWhere({
    id: _fromRankingPodcastId,
  })
  await rankingPodcastEdgeAccessor.deleteWhere({
    _from: `${rankingPodcastAccessor.name}/${_fromRankingPodcastId}`,
  })

  return {
    result: 'ok',
  }
}
