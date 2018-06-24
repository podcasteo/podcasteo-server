import followUserAccessor from 'modules/followUserEdge/client/database/accessor'
import userAccessor from 'modules/users/client/database/accessor'

export default async (_fromUserId, _toUserId) => {
  const globalIdFrom = `${userAccessor.name}/${_fromUserId}`
  const globalIdTo = `${userAccessor.name}/${_toUserId}`
  const data = await followUserAccessor.selectWhere({
    _from: globalIdFrom,
    _to: globalIdTo,
  })

  if (data.length < 1) {
    throw new Error('NOT_FOUND')
  }

  return data[0]
}
