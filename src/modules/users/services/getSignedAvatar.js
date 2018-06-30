import path from 'path'

import s3Bucket from 'clients/aws'

export default async function getSignedAvatar(user) {
  const uri = path.join('users', user.id, 'avatar', 'default.jpg')
  const params = {
    Key: uri,
    Expires: 3600,
  }
  const url = s3Bucket.getSignedUrl('getObject', params)

  return url
}
