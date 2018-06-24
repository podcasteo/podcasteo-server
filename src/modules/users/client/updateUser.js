import userAccessor from 'modules/users/client/database/accessor'

export default async (id, data) => {
  const result = await userAccessor.updateWhere({
    id,
  }, data)

  return result
}
