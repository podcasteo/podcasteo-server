import podcastAccessor from 'modules/podcasts/client/database/accessor'
import errMiddleware from 'helpers/errors'

export default async (slug) => {
  const data = await podcastAccessor.selectWhere({
    slug,
  })

  if (data.length < 1) {
    throw errMiddleware.notFound(podcastAccessor.name, 'podcast introuvable')
  }

  return data[0]
}
