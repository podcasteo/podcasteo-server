import likePodcastAccessor from 'modules/likePodcastEdge/client/database/accessor'

export default async (id) => {
  const data = await likePodcastAccessor.selectWhere({
    id,
  })

  if (data.length < 1) {
    throw new Error('NOT_FOUND')
  }

  return data[0]
}
