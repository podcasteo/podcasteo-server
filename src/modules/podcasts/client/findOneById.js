import podcastAccessor from 'modules/podcasts/client/database/accessor'
import errMiddleware from 'helpers/errors'

export default async (id) => {
  const data = await podcastAccessor.selectWhere({
    id,
  })

  if (data.length < 1) {
    throw errMiddleware.notFound(podcastAccessor.name)
  }

  return data[0]
}
