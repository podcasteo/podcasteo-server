import arango from 'clients/arango'
import podcastAccessor from 'modules/podcasts/client/database/accessor'
import memberPodcastAccessor from 'modules/memberPodcastEdge/client/database/accessor'
import userAccessor from 'modules/users/client/database/accessor'

export default async (_toPodcastId, options) => {
  const {
    first,
    offset,
  } = options
  const globalId = `${podcastAccessor.name}/${_toPodcastId}`
  const edgesQuery = 'FOR user, edge IN 1 INBOUND toPodcast @@edge'
  const query = `
    LET toPodcast = DOCUMENT('${globalId}')

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
      '@edge': memberPodcastAccessor.name,
    },
  })
  const result = await cursor.next()

  result.data = result.data.map((element) => ({
    ...memberPodcastAccessor.serializer.deserialize(element),
    user: userAccessor.serializer.deserialize(element.user),
  }))

  return result
}
