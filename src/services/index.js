import {
  Router,
} from 'express'
import {
  graphqlExpress,
  graphiqlExpress,
} from 'apollo-server-express'

import schema from 'services/graphql'

const router = Router()

router.use('/graphql', graphqlExpress({
  schema,
}))
router.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}))

export default router
