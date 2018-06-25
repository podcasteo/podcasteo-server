import podcastAccessor from 'modules/podcasts/client/database/accessor'

export default async (id) => {
  const data = await podcastAccessor.deleteWhere({
    id,
  })

  return {
    result: 'ok',
    data,
  }
}
