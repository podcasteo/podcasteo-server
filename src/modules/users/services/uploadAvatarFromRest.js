import client from 'modules/users/client'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'

export default async function uploadAvatarFromRest(file) {
  const user = authMiddleware.handleUser(context)
  const stream = file.buffer

  try {
    await client.uploadAvatar(user.id, stream)

    return user
  } catch (error) {
    console.log(error) // eslint-disable-line

    throw errMiddleware.badRequest()
  }
}
