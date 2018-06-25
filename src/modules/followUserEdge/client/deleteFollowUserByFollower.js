import followUserAccessor from 'modules/followUserEdge/client/database/accessor'
import userAccessor from 'modules/users/client/database/accessor'

export default async (_fromUserId) => {
  const globalId = `${userAccessor.name}/${_fromUserId}`
  const data = await followUserAccessor.deleteWhere({
    _from: globalId,
  })

  return {
    result: 'ok',
    data,
  }
}
