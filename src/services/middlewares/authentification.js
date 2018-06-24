import config from 'config'
import jwt from 'jsonwebtoken'

import client from 'modules/users/client'

function tokenExtractor(req) {
  let extractToken = null

  if (req && req.headers.authorization) {
    extractToken = req.headers.authorization
  } else if (req && req.body.token) {
    extractToken = req.body.token
  } else if (req.query && req.query.api_key) {
    extractToken = req.query.api_key
  } else if (req && req.cookies && req.cookies.token) {
    extractToken = req.cookies.token
  }

  return extractToken
}

async function handleToken(req, res, next) {
  const token = tokenExtractor(req)
  let user = null

  try {
    const decoded = await jwt.verify(token, config.get('jwt.secretKey'))

    if (decoded) {
      user = await client.findOneById(decoded.id)

      req.user = user
    }

    return next()
  } catch (error) {
    return next()
  }
}

export default {
  tokenExtractor,
  handleToken,
}
