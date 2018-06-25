import likePodcastAccessor from 'modules/likePodcastEdge/client/database/accessor'

export default async (id) => {
  const data = await likePodcastAccessor.deleteWhere({
    id,
  })

  return {
    result: 'ok',
    data,
  }
}
