import likeGroupAccessor from 'modules/likeGroupEdge/client/database/accessor'
import groupAccessor from 'modules/groups/client/database/accessor'

export default async (groupId) => {
  const globalGroupId = `${groupAccessor.name}/${groupId}`
  const data = await likeGroupAccessor.deleteWhere({
    _to: globalGroupId,
  })

  return {
    result: 'ok',
    data,
  }
}
