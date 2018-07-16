import userAccessor from 'modules/users/client/database/accessor'
import errMiddleware from 'helpers/errors'

export default async (facebookId) => {
  const data = await userAccessor.selectWhere({
    facebookId,
  })

  if (data.length < 1) {
    throw errMiddleware.notFound(userAccessor.name, 'utilisateur introuvable')
  }

  return data[0]
}
