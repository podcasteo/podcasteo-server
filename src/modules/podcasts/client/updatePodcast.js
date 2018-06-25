import podcastAccessor from 'modules/podcasts/client/database/accessor'

export default async (id, data) => {
  const result = await podcastAccessor.updateWhere({
    id,
  }, data)

  return result
}
