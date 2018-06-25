import memberGroupAccessor from 'modules/memberGroupEdge/client/database/accessor'
import groupAccessor from 'modules/groups/client/database/accessor'

export default async (groupId) => {
  const globalGroupId = `${groupAccessor.name}/${groupId}`
  const data = await memberGroupAccessor.deleteWhere({
    _to: globalGroupId,
  })

  return {
    result: 'ok',
    data,
  }
}
