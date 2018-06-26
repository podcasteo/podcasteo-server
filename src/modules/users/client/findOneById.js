import userAccessor from 'modules/users/client/database/accessor'
import errMiddleware from 'helpers/errors'

export default async (id) => {
  const data = await userAccessor.selectWhere({
    id,
  })

  if (data.length < 1) {
    throw errMiddleware.notFound(userAccessor.name)
  }

  return data[0]
}
