import groupAccessor from 'modules/groups/client/database/accessor'
import errMiddleware from 'helpers/errors'

export default async (id) => {
  const data = await groupAccessor.selectWhere({
    id,
  })

  if (data.length < 1) {
    throw errMiddleware.notFound(groupAccessor.name, 'groupe introuvable')
  }

  return data[0]
}
