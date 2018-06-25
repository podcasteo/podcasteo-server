import likeGroupAccessor from 'modules/likeGroupEdge/client/database/accessor'

export default async (id) => {
  const data = await likeGroupAccessor.deleteWhere({
    id,
  })

  return {
    result: 'ok',
    data,
  }
}
