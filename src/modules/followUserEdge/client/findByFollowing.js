import arango from 'clients/arango'
import userAccessor from 'modules/users/client/database/accessor'
import followAccessor from 'modules/followUserEdge/client/database/accessor'

export default async (_toUserId, options) => {
  const {
    first,
    offset,
  } = options
  const globalId = `${userAccessor.name}/${_toUserId}`
  const edgesQuery = 'FOR user, edge IN 1 INBOUND toUser @@edge'
  const query = `
    LET toUser = DOCUMENT('${globalId}')

    LET totalCount = LENGTH(
      ${edgesQuery}
      RETURN user
    )

    LET data = (
      ${edgesQuery}
        LIMIT ${offset}, ${first}
      RETURN MERGE(
        edge,
        {
          user: user
        }
      )
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

  result.data = result.data.map((element) => ({
    ...followAccessor.serializer.deserialize(element),
    user: userAccessor.serializer.deserialize(element.user),
  }))

  return result
}
