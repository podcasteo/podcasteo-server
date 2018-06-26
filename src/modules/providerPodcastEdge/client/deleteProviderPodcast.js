import {
  providerPodcastAccessor,
  providerPodcastEdgeAccessor,
} from 'modules/providerPodcastEdge/client/database/accessor'

export default async (_fromProviderPodcastId) => {
  await providerPodcastAccessor.deleteWhere({
    id: _fromProviderPodcastId,
  })
  await providerPodcastEdgeAccessor.deleteWhere({
    _from: `${providerPodcastAccessor.name}/${_fromProviderPodcastId}`,
  })

  return {
    result: 'ok',
  }
}
