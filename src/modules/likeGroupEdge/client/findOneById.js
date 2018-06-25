import likeGroupAccessor from 'modules/likeGroupEdge/client/database/accessor'

export default async (id) => {
  const data = await likeGroupAccessor.selectWhere({
    id,
  })

  if (data.length < 1) {
    throw new Error('NOT_FOUND')
  }

  return data[0]
}
