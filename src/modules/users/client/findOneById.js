import userAccessor from 'modules/users/client/database/accessor'

export default async (id) => {
  const data = await userAccessor.selectWhere({
    id,
  })

  if (data.length < 1) {
    throw new Error('NOT_FOUND')
  }

  return data[0]
}
