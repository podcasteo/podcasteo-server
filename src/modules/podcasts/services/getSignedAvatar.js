import path from 'path'

import s3Bucket from 'clients/aws'

export default async function getSignedAvatar(podcast) {
  const uri = path.join('podcasts', podcast.id, 'avatar', 'default.jpg')
  const params = {
    Key: uri,
    Expires: 3600,
  }
  const url = s3Bucket.getSignedUrl('getObject', params)

  return url
}
