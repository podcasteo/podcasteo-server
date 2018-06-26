import podcastAccessor from 'modules/podcasts/client/database/accessor'
import {
  providerPodcastAccessor,
  providerPodcastEdgeAccessor,
} from 'modules/providerPodcastEdge/client/database/accessor'

export default async (data) => {
  const {
    _to: _toPodcastId,
    type,
    createdAt,
    ...dataProvider
  } = data
  const providerPodcastResult = await providerPodcastAccessor.insert(dataProvider)

  try {
    await providerPodcastEdgeAccessor.insert({
      _from: `${providerPodcastAccessor.name}/${providerPodcastResult.id}`,
      _to: `${podcastAccessor.name}/${_toPodcastId}`,
      type,
      createdAt,
    })
  } catch (error) {
    await providerPodcastAccessor.deleteWhere({
      id: providerPodcastResult.id,
    })

    throw error
  }

  return {
    result: 'ok',
  }
}
