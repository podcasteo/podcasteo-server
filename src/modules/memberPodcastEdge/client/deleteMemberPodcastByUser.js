import memberPodcastAccessor from 'modules/memberPodcastEdge/client/database/accessor'
import userAccessor from 'modules/users/client/database/accessor'

export default async (userId) => {
  const globalUserId = `${userAccessor.name}/${userId}`
  const data = await memberPodcastAccessor.deleteWhere({
    _from: globalUserId,
  })

  return {
    result: 'ok',
    data,
  }
}
