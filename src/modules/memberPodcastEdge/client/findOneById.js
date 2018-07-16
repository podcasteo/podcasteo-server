import memberPodcastAccessor from 'modules/memberPodcastEdge/client/database/accessor'
import errMiddleware from 'helpers/errors'

export default async (id) => {
  const data = await memberPodcastAccessor.selectWhere({
    id,
  })

  if (data.length < 1) {
    throw errMiddleware.notFound(memberPodcastAccessor.name, 'membre du podcast introuvable')
  }

  return data[0]
}
