import memberGroupAccessor from 'modules/memberGroupEdge/client/database/accessor'

export default async (id) => {
  const data = await memberGroupAccessor.selectWhere({
    id,
  })

  if (data.length < 1) {
    throw new Error('NOT_FOUND')
  }

  return data[0]
}
