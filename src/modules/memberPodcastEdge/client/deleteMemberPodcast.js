import memberPodcastAccessor from 'modules/memberPodcastEdge/client/database/accessor'

export default async (id) => {
  const data = await memberPodcastAccessor.deleteWhere({
    id,
  })

  return {
    result: 'ok',
    data,
  }
}
