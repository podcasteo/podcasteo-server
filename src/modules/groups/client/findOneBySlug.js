import groupAccessor from 'modules/groups/client/database/accessor'
import errMiddleware from 'helpers/errors'

export default async (slug) => {
  const data = await groupAccessor.selectWhere({
    slug,
  })

  if (data.length < 1) {
    throw errMiddleware.notFound(groupAccessor.name)
  }

  return data[0]
}
