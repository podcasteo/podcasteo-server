import memberPodcastAccessor from 'modules/memberPodcastEdge/client/database/accessor'

export default async (id, data) => {
  const result = await memberPodcastAccessor.updateWhere({
    id,
  }, data)

  return result
}
