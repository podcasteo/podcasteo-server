import likeGroupAccessor from 'modules/likeGroupEdge/client/database/accessor'
import userAccessor from 'modules/users/client/database/accessor'

export default async (userId) => {
  const globalUserId = `${userAccessor.name}/${userId}`
  const data = await likeGroupAccessor.deleteWhere({
    _from: globalUserId,
  })

  return {
    result: 'ok',
    data,
  }
}
