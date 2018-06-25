import arango from 'clients/arango'
import groupAccessor from 'modules/groups/client/database/accessor'
import memberGroupAccessor from 'modules/memberGroupEdge/client/database/accessor'
import userAccessor from 'modules/users/client/database/accessor'

export default async (_fromUserId, options) => {
  const {
    first,
    offset,
  } = options
  const globalId = `${userAccessor.name}/${_fromUserId}`
  const edgesQuery = 'FOR group, edge IN 1 OUTBOUND fromUser @@edge'
  const query = `
    LET fromUser = DOCUMENT('${globalId}')

    LET totalCount = LENGTH(
      ${edgesQuery}
      RETURN group
    )

    LET data = (
      ${edgesQuery}
        LIMIT ${offset}, ${first}
      RETURN MERGE(
        edge,
        {
          group: group
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
      '@edge': memberGroupAccessor.name,
    },
  })
  const result = await cursor.next()

  result.data = result.data.map((element) => ({
    ...memberGroupAccessor.serializer.deserialize(element),
    group: groupAccessor.serializer.deserialize(element.group),
  }))

  return result
}
