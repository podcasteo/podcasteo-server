import userAccessor from 'modules/users/client/database/accessor'
import errMiddleware from 'helpers/errors'

export default async (email) => {
  const data = await userAccessor.selectWhere({
    email,
  })

  if (data.length < 1) {
    throw errMiddleware.notFound(userAccessor.name, 'utilisateur introuvable')
  }

  return data[0]
}
