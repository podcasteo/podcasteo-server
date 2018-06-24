import followUserAccessor from 'modules/followUserEdge/client/database/accessor'

export default async (id) => {
  const data = await followUserAccessor.deleteWhere({
    id,
  })

  return {
    result: 'ok',
    data,
  }
}
