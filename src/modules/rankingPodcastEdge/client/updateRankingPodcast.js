import {
  rankingPodcastAccessor,
} from 'modules/rankingPodcastEdge/client/database/accessor'

export default async (id, data) => {
  const result = await rankingPodcastAccessor.updateWhere({
    id,
  }, data)

  return result
}
