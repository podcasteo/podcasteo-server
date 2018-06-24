import groupAccessor from 'modules/groups/client/database/accessor'

export default async (id, data) => {
  const result = await groupAccessor.updateWhere({
    id,
  }, data)

  return result
}
