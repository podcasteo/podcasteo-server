import userAccessor from 'modules/users/client/database/accessor'

export default async (data) => {
  const result = await userAccessor.insert(data)

  return {
    result: 'ok',
    data: result,
  }
}
