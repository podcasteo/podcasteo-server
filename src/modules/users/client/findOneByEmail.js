import userAccessor from 'modules/users/client/database/accessor'

export default async (email) => {
  const data = await userAccessor.selectWhere({
    email,
  })

  if (data.length < 1) {
    throw new Error('NOT_FOUND')
  }

  return data[0]
}
