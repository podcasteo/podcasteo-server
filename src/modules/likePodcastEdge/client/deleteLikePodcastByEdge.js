import likePodcastAccessor from 'modules/likePodcastEdge/client/database/accessor'
import userAccessor from 'modules/users/client/database/accessor'
import podcastAccessor from 'modules/podcasts/client/database/accessor'

export default async (_fromUserId, _toPodcastId) => {
  const globalIdFrom = `${userAccessor.name}/${_fromUserId}`
  const globalIdTo = `${podcastAccessor.name}/${_toPodcastId}`
  const data = await likePodcastAccessor.deleteWhere({
    _from: globalIdFrom,
    _to: globalIdTo,
  })

  return {
    result: 'ok',
    data,
  }
}
