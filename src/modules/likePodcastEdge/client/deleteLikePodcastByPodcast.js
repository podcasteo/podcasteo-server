import likePodcastAccessor from 'modules/likePodcastEdge/client/database/accessor'
import podcastAccessor from 'modules/podcasts/client/database/accessor'

export default async (podcastId) => {
  const globalPodcastId = `${podcastAccessor.name}/${podcastId}`
  const data = await likePodcastAccessor.deleteWhere({
    _to: globalPodcastId,
  })

  return {
    result: 'ok',
    data,
  }
}
