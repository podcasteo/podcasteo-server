import memberPodcastAccessor from 'modules/memberPodcastEdge/client/database/accessor'
import userAccessor from 'modules/users/client/database/accessor'
import podcastAccessor from 'modules/podcasts/client/database/accessor'

export default async (data) => {
  const memberPodcast = {
    ...data,
    _from: `${userAccessor.name}/${data._from}`, // eslint-disable-line no-underscore-dangle
    _to: `${podcastAccessor.name}/${data._to}`, // eslint-disable-line no-underscore-dangle
    createdAt: new Date().toISOString(),
  }
  const result = await memberPodcastAccessor.insert(memberPodcast)

  return {
    result: 'ok',
    data: result,
  }
}
