import memberGroupAccessor from 'modules/memberGroupEdge/client/database/accessor'

export default async (id) => {
  const data = await memberGroupAccessor.deleteWhere({
    id,
  })

  return {
    result: 'ok',
    data,
  }
}
