import {
  Router,
} from 'express'
import {
  graphqlExpress,
  graphiqlExpress,
} from 'apollo-server-express'

import schema from 'services/graphql'
import apiServices from 'services/api'
import authMiddleware from 'services/middlewares/authentification'

const router = Router()

router.use('/graphql', authMiddleware.handleToken)
router.use('/graphql', graphqlExpress((req) => ({
  schema,
  context: {
    user: req.user,
  },
})))
router.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}))

router.use('/api', authMiddleware.handleToken)
router.use('/api', apiServices)

export default router
