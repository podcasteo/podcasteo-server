import groupAccessor from 'modules/groups/client/database/accessor'

export default async (data) => {
  const group = {
    ...data,
    createdAt: new Date().toISOString(),
  }
  const result = await groupAccessor.insert(group)

  return {
    result: 'ok',
    data: result,
  }
}
