import followUserAccessor from 'modules/followUserEdge/client/database/accessor'
import errMiddleware from 'helpers/errors'

export default async (id) => {
  const data = await followUserAccessor.selectWhere({
    id,
  })

  if (data.length < 1) {
    throw errMiddleware.notFound(followUserAccessor.name)
  }

  return data[0]
}
