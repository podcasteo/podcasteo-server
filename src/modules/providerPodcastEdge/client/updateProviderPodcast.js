import {
  providerPodcastAccessor,
} from 'modules/providerPodcastEdge/client/database/accessor'

export default async (id, data) => {
  const result = await providerPodcastAccessor.updateWhere({
    id,
  }, data)

  return result
}
