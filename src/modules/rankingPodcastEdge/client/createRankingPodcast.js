import podcastAccessor from 'modules/podcasts/client/database/accessor'
import {
  rankingPodcastAccessor,
  rankingPodcastEdgeAccessor,
} from 'modules/rankingPodcastEdge/client/database/accessor'

export default async (data) => {
  const {
    _to: _toPodcastId,
    createdAt,
    ...dataProvider
  } = data
  const rankingPodcastResult = await rankingPodcastAccessor.insert(dataProvider)

  try {
    await rankingPodcastEdgeAccessor.insert({
      _from: `${rankingPodcastAccessor.name}/${rankingPodcastResult.id}`,
      _to: `${podcastAccessor.name}/${_toPodcastId}`,
      createdAt,
    })
  } catch (error) {
    await rankingPodcastAccessor.deleteWhere({
      id: rankingPodcastResult.id,
    })

    throw error
  }

  return {
    result: 'ok',
  }
}
