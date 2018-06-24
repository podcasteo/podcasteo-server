import groupAccessor from 'modules/groups/client/database/accessor'

export default async (id) => {
  const data = await groupAccessor.selectWhere({
    id,
  })

  if (data.length < 1) {
    throw new Error('NOT_FOUND')
  }

  return data[0]
}
