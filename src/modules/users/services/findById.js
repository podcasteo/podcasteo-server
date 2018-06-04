import client from 'modules/users/client'

export default async function findById(id) {
  // verify id

  const result = await client.findById(id)

  if (!result) {
    throw new Error('NOT_FOUND')
  }

  return result
}
