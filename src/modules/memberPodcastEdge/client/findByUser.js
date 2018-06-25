import arango from 'clients/arango'
import podcastAccessor from 'modules/podcasts/client/database/accessor'
import memberPodcastAccessor from 'modules/memberPodcastEdge/client/database/accessor'
import userAccessor from 'modules/users/client/database/accessor'

export default async (_fromUserId, options) => {
  const {
    first,
    offset,
  } = options
  const globalId = `${userAccessor.name}/${_fromUserId}`
  const edgesQuery = 'FOR podcast, edge IN 1 OUTBOUND fromUser @@edge'
  const query = `
    LET fromUser = DOCUMENT('${globalId}')

    LET totalCount = LENGTH(
      ${edgesQuery}
      RETURN podcast
    )

    LET data = (
      ${edgesQuery}
        LIMIT ${offset}, ${first}
      RETURN MERGE(
        edge,
        {
          podcast: podcast
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
      '@edge': memberPodcastAccessor.name,
    },
  })
  const result = await cursor.next()

  result.data = result.data.map((element) => ({
    ...memberPodcastAccessor.serializer.deserialize(element),
    podcast: podcastAccessor.serializer.deserialize(element.podcast),
  }))

  return result
}
