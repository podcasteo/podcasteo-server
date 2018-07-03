import path from 'path'

import s3Bucket from 'clients/aws'

export default async function getSignedAvatar(group) {
  const uri = path.join('groups', group.id, 'avatar', 'default.jpg')
  const params = {
    Key: uri,
    Expires: 3600,
  }
  const url = s3Bucket.getSignedUrl('getObject', params)

  return url
}
