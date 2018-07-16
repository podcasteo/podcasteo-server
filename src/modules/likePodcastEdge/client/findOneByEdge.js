import likePodcastAccessor from 'modules/likePodcastEdge/client/database/accessor'
import userAccessor from 'modules/users/client/database/accessor'
import podcastAccessor from 'modules/podcasts/client/database/accessor'
import errMiddleware from 'helpers/errors'

export default async (_fromUserId, _toPodcastId) => {
  const globalIdFrom = `${userAccessor.name}/${_fromUserId}`
  const globalIdTo = `${podcastAccessor.name}/${_toPodcastId}`
  const data = await likePodcastAccessor.selectWhere({
    _from: globalIdFrom,
    _to: globalIdTo,
  })

  if (data.length < 1) {
    throw errMiddleware.notFound(likePodcastAccessor.name, 'like introuvable')
  }

  return data[0]
}
