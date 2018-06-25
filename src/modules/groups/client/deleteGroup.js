import groupAccessor from 'modules/groups/client/database/accessor'

export default async (id) => {
  const data = await groupAccessor.deleteWhere({
    id,
  })

  return {
    result: 'ok',
    data,
  }
}
