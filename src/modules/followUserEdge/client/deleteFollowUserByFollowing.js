import followUserAccessor from 'modules/followUserEdge/client/database/accessor'
import userAccessor from 'modules/users/client/database/accessor'

export default async (_toUserId) => {
  const globalId = `${userAccessor.name}/${_toUserId}`
  const data = await followUserAccessor.deleteWhere({
    _to: globalId,
  })

  return {
    result: 'ok',
    data,
  }
}
