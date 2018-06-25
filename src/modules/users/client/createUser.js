import userAccessor from 'modules/users/client/database/accessor'

export default async (data) => {
  const user = {
    ...data,
    createdAt: new Date().toISOString(),
  }
  const result = await userAccessor.insert(user)

  return {
    result: 'ok',
    data: result,
  }
}
