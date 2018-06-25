import memberGroupAccessor from 'modules/memberGroupEdge/client/database/accessor'

export default async (id, data) => {
  const result = await memberGroupAccessor.updateWhere({
    id,
  }, data)

  return result
}
