import podcastAccessor from 'modules/podcasts/client/database/accessor'

export default async (slug) => {
  const data = await podcastAccessor.selectWhere({
    slug,
  })

  if (data.length < 1) {
    throw new Error('NOT_FOUND')
  }

  return data[0]
}
