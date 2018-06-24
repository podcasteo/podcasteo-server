import groupAccessor from 'modules/groups/client/database/accessor'

export default async (id) => {
  const result = await groupAccessor.deleteWhere({
    id,
  })

  return result
}
