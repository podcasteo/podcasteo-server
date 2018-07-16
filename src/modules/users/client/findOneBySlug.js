import userAccessor from 'modules/users/client/database/accessor'
import errMiddleware from 'helpers/errors'

export default async (slug) => {
  const data = await userAccessor.selectWhere({
    slug,
  })

  if (data.length < 1) {
    throw errMiddleware.notFound(userAccessor.name, 'utilisateur introuvable')
  }

  return data[0]
}
