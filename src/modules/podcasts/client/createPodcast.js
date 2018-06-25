import podcastAccessor from 'modules/podcasts/client/database/accessor'

export default async (data) => {
  const podcast = {
    ...data,
    createdAt: new Date().toISOString(),
  }
  const result = await podcastAccessor.insert(podcast)

  return {
    result: 'ok',
    data: result,
  }
}
