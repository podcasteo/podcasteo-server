import memberGroupAccessor from 'modules/memberGroupEdge/client/database/accessor'
import userAccessor from 'modules/users/client/database/accessor'
import groupAccessor from 'modules/groups/client/database/accessor'

export default async (_fromUserId, _toGroupId) => {
  const globalIdFrom = `${userAccessor.name}/${_fromUserId}`
  const globalIdTo = `${groupAccessor.name}/${_toGroupId}`
  const data = await memberGroupAccessor.deleteWhere({
    _from: globalIdFrom,
    _to: globalIdTo,
  })

  return {
    result: 'ok',
    data,
  }
}
