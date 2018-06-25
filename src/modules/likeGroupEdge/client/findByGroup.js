import arango from 'clients/arango'
import groupAccessor from 'modules/groups/client/database/accessor'
import likeGroupAccessor from 'modules/likeGroupEdge/client/database/accessor'
import userAccessor from 'modules/users/client/database/accessor'

export default async (_toGroupId, options) => {
  const {
    first,
    offset,
  } = options
  const globalId = `${groupAccessor.name}/${_toGroupId}`
  const edgesQuery = 'FOR user, edge IN 1 INBOUND toGroup @@edge'
  const query = `
    LET toGroup = DOCUMENT('${globalId}')

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
      '@edge': likeGroupAccessor.name,
    },
  })
  const result = await cursor.next()

  result.data = result.data.map((element) => ({
    ...likeGroupAccessor.serializer.deserialize(element),
    user: userAccessor.serializer.deserialize(element.user),
  }))

  return result
}
