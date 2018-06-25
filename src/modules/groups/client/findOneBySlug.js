import groupAccessor from 'modules/groups/client/database/accessor'

export default async (slug) => {
  const data = await groupAccessor.selectWhere({
    slug,
  })

  if (data.length < 1) {
    throw new Error('NOT_FOUND')
  }

  return data[0]
}
