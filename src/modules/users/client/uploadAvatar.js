import path from 'path'

import s3Bucket from 'clients/aws'

export default async (id, stream) => {
  const uri = path.join('users', id, 'avatar', 'default.jpg')

  await s3Bucket.upload({
    Key: uri,
    Body: stream,
    ContentType: 'image/jpeg',
  }).promise()

  return {
    result: 'ok',
  }
}
