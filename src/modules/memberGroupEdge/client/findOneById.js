import memberGroupAccessor from 'modules/memberGroupEdge/client/database/accessor'
import errMiddleware from 'helpers/errors'

export default async (id) => {
  const data = await memberGroupAccessor.selectWhere({
    id,
  })

  if (data.length < 1) {
    throw errMiddleware.notFound(memberGroupAccessor.name, 'membre du groupe introuvable')
  }

  return data[0]
}
