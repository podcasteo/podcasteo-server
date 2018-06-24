import followUserAccessor from 'modules/followUserEdge/client/database/accessor'
import userAccessor from 'modules/users/client/database/accessor'

export default async (userId) => {
  const globalId = `${userAccessor.name}/${userId}`

  await followUserAccessor.deleteWhere({
    _from: globalId,
  })

  await followUserAccessor.deleteWhere({
    _to: globalId,
  })

  return {
    result: 'ok',
  }
}
