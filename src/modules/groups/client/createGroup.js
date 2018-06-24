import groupAccessor from 'modules/groups/client/database/accessor'

export default async (data) => {
  const result = await groupAccessor.insert(data)

  return result
}
