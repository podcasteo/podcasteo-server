import followUserAccessor from 'modules/followUserEdge/client/database/accessor'
import userAccessor from 'modules/users/client/database/accessor'

export default async (data) => {
  const follow = {
    ...data,
    _from: `${userAccessor.name}/${data._from}`, // eslint-disable-line no-underscore-dangle
    _to: `${userAccessor.name}/${data._to}`, // eslint-disable-line no-underscore-dangle
    createdAt: new Date().toISOString(),
  }
  const result = await followUserAccessor.insert(follow)

  return {
    result: 'ok',
    data: result,
  }
}
