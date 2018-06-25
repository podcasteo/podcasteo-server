import podcastAccessor from 'modules/podcasts/client/database/accessor'

export default async (id) => {
  const data = await podcastAccessor.selectWhere({
    id,
  })

  if (data.length < 1) {
    throw new Error('NOT_FOUND')
  }

  return data[0]
}
