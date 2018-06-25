import likePodcastAccessor from 'modules/likePodcastEdge/client/database/accessor'
import userAccessor from 'modules/users/client/database/accessor'

export default async (userId) => {
  const globalUserId = `${userAccessor.name}/${userId}`
  const data = await likePodcastAccessor.deleteWhere({
    _from: globalUserId,
  })

  return {
    result: 'ok',
    data,
  }
}
