import userAccessor from 'modules/users/client/database/accessor'

export default async (id) => {
  const data = await userAccessor.deleteWhere({
    id,
  })

  return {
    result: 'ok',
    data,
  }
}
