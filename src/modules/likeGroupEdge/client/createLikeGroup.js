import likeGroupAccessor from 'modules/likeGroupEdge/client/database/accessor'
import userAccessor from 'modules/users/client/database/accessor'
import groupAccessor from 'modules/groups/client/database/accessor'

export default async (data) => {
  const likeGroup = {
    ...data,
    _from: `${userAccessor.name}/${data._from}`, // eslint-disable-line no-underscore-dangle
    _to: `${groupAccessor.name}/${data._to}`, // eslint-disable-line no-underscore-dangle
    createdAt: new Date().toISOString(),
  }
  const result = await likeGroupAccessor.insert(likeGroup)

  return {
    result: 'ok',
    data: result,
  }
}
