import followUserAccessor from 'modules/followUserEdge/client/database/accessor'

export default async (id) => {
  const data = await followUserAccessor.selectWhere({
    id,
  })

  if (data.length < 1) {
    throw new Error('NOT_FOUND')
  }

  return data[0]
}
