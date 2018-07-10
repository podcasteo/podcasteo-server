import {
  Router,
} from 'express'

import podcasts from 'services/api/podcasts'
import users from 'services/api/users'

const router = Router()

router.use('/podcasts', podcasts)
router.use('/users', users)

router.get('/', (req, res) => {
  res.send({
    users: {
      login: {
        method: 'PUT',
        url: '/users/login',
      },
    },
    podcast: {
      find: {
        method: 'GET',
        url: '/podcasts',
      },
      findOne: {
        method: 'GET',
        url: '/podcasts/:id',
      },
      createOrUpdate: {
        method: 'PUT',
        url: '/podcasts',
      },
      uploadAvatar: {
        method: 'PUT',
        url: '/podcasts/:id/avatar',
      },
      findProviderPodcasts: {
        method: 'GET',
        url: '/podcasts/:id/providers',
      },
      createOrUpdateProviderPodcasts: {
        method: 'PUT',
        url: '/podcasts/:id/providers',
      },
    },
  })
})

export default router
