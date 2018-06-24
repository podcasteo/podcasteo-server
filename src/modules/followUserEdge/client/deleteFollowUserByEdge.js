import followUserAccessor from 'modules/followUserEdge/client/database/accessor'
import userAccessor from 'modules/users/client/database/accessor'

export default async (_fromUserId, _toUserId) => {
  const globalIdFrom = `${userAccessor.name}/${_fromUserId}`
  const globalIdTo = `${userAccessor.name}/${_toUserId}`
  const data = await followUserAccessor.deleteWhere({
    _from: globalIdFrom,
    _to: globalIdTo,
  })

  return {
    result: 'ok',
    data,
  }
}
