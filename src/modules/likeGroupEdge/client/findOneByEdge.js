import likeGroupAccessor from 'modules/likeGroupEdge/client/database/accessor'
import userAccessor from 'modules/users/client/database/accessor'
import groupAccessor from 'modules/groups/client/database/accessor'
import errMiddleware from 'helpers/errors'

export default async (_fromUserId, _toGroupId) => {
  const globalIdFrom = `${userAccessor.name}/${_fromUserId}`
  const globalIdTo = `${groupAccessor.name}/${_toGroupId}`
  const data = await likeGroupAccessor.selectWhere({
    _from: globalIdFrom,
    _to: globalIdTo,
  })

  if (data.length < 1) {
    throw errMiddleware.notFound(likeGroupAccessor.name, 'like introuvable')
  }

  return data[0]
}
