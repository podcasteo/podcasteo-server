import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'
import uploadAvatar from 'helpers/uploadAvatar'
import client from 'modules/users/client'

export default async function uploadAvatarFromGraphQL(file, context) {
  const user = authMiddleware.handleUser(context)

  try {
    const {
      stream,
    } = await file
    const result = await uploadAvatar('users', user.slug, stream)

    await client.updateUser(user.id, {
      avatar: result.url,
    })

    return client.findOneById(user.id)
  } catch (error) {
    console.log(error) // eslint-disable-line

    throw errMiddleware.badRequest('users', "erreur au téléchargement de l'avatar")
  }
}
