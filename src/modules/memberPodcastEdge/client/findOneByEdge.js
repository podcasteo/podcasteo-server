import memberPodcastAccessor from 'modules/memberPodcastEdge/client/database/accessor'
import userAccessor from 'modules/users/client/database/accessor'
import podcastAccessor from 'modules/podcasts/client/database/accessor'

export default async (_fromUserId, _toPodcastId) => {
  const globalIdFrom = `${userAccessor.name}/${_fromUserId}`
  const globalIdTo = `${podcastAccessor.name}/${_toPodcastId}`
  const data = await memberPodcastAccessor.selectWhere({
    _from: globalIdFrom,
    _to: globalIdTo,
  })

  if (data.length < 1) {
    throw new Error('NOT_FOUND')
  }

  return data[0]
}
