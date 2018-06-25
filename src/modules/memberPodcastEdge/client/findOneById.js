import memberPodcastAccessor from 'modules/memberPodcastEdge/client/database/accessor'

export default async (id) => {
  const data = await memberPodcastAccessor.selectWhere({
    id,
  })

  if (data.length < 1) {
    throw new Error('NOT_FOUND')
  }

  return data[0]
}
