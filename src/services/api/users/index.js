import {
  Router,
} from 'express'

import usersServices from 'modules/users/services'
import {
  wrapAsync,
} from 'services/middlewares/error'

const router = Router()

async function login(req, res) {
  const result = await usersServices.login(req.body)

  return res.send(result)
}

router.put('/login', wrapAsync(login))

export default router
