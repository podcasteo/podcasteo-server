import arango from 'clients/arango'
import userAccessor from 'modules/users/client/database/accessor'
import followAccessor from 'modules/followUserEdge/client/database/accessor'

export default async function getFollows(id, options, following) {
  const {
    first,
    offset,
  } = options
  const globalId = `${userAccessor.name}/${id}`
  const edgesQuery = `FOR user, edge IN 1 ${following ? 'OUTBOUND' : 'INBOUND'} firstUser @@edge`
  const query = `
    LET firstUser = DOCUMENT('${globalId}')

    LET totalCount = LENGTH(
      ${edgesQuery}
      RETURN user
    )

    LET data = (
      ${edgesQuery}
        LIMIT ${offset}, ${first}
      RETURN user
    )

    RETURN {
      data: data,
      totalCount: totalCount
    }
  `
  const cursor = await arango.query({
    query,
    bindVars: {
      '@edge': followAccessor.name,
    },
  })
  const result = await cursor.next()

  result.data = result.data.map((element) => userAccessor.serializer.deserialize(element))

  return result
}
