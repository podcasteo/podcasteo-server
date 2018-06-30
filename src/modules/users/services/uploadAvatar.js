import path from 'path'

import s3Bucket from 'clients/aws'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'

export default async function uploadAvatar(file, context) {
  const user = authMiddleware.handleUser(context)
  const {
    stream,
  } = await file
  const uri = path.join('users', user.id, 'avatar', 'default.jpg')

  try {
    await s3Bucket.upload({
      Key: uri,
      Body: stream,
      ContentType: 'image/jpeg',
    }).promise()

    return user
  } catch (error) {
    console.log(error) // eslint-disable-line

    throw errMiddleware.badRequest()
  }
}
