import likePodcastAccessor from 'modules/likePodcastEdge/client/database/accessor'
import errMiddleware from 'helpers/errors'

export default async (id) => {
  const data = await likePodcastAccessor.selectWhere({
    id,
  })

  if (data.length < 1) {
    throw errMiddleware.notFound(likePodcastAccessor.name)
  }

  return data[0]
}
