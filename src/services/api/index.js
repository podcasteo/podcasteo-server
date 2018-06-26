import {
  Router,
} from 'express'

import podcasts from 'services/api/podcasts'

const router = Router()

router.use('/podcasts', podcasts)

router.get('/', (req, res) => {
  res.send({
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
