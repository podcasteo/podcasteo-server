import likeGroupAccessor from 'modules/likeGroupEdge/client/database/accessor'
import errMiddleware from 'helpers/errors'

export default async (id) => {
  const data = await likeGroupAccessor.selectWhere({
    id,
  })

  if (data.length < 1) {
    throw errMiddleware.notFound(likeGroupAccessor.name)
  }

  return data[0]
}
