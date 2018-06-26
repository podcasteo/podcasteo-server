import {
  Router,
} from 'express'

import podcastServices from 'modules/podcasts/services'
import providerPodcastServices from 'modules/providerPodcastEdge/services'
import {
  wrapAsync,
} from 'services/middlewares/error'
import errMiddleware from 'helpers/errors'

const router = Router()

async function find(req, res) {
  const result = await podcastServices.find(req.query)

  return res.send(result)
}

async function findProviderPodcasts(req, res) {
  const result = await providerPodcastServices.find(req.params.id, req.query)

  return res.send(result)
}

async function findOneById(req, res) {
  const result = await podcastServices.findOneById(req.params.id)

  return res.send(result)
}

async function createOrUpdatePodcast(req, res) {
  const data = req.body
  let result

  if (!data.id) {
    result = await podcastServices.createPodcast(req.body, req)
  }

  try {
    await podcastServices.findOneById(data.id)

    result = await podcastServices.updatePodcast(data.id, data, req)
  } catch (error) {
    if (error.status === errMiddleware.notFound().status) {
      result = await podcastServices.createPodcast(req.body, req)
    } else {
      throw error
    }
  }

  return res.send(result)
}

async function createOrUpdateProviderPodcasts(req, res) {
  // const {
  //   _to,
  //   type,
  //   createdAt,
  // } = req.body
  const data = {
    ...req.body,
    _to: req.params.id,
  }
  let result

  try {
    result = await providerPodcastServices.updateProviderPodcast(data, req)
  } catch (error) {
    if (error.status === errMiddleware.notFound().status) {
      result = await providerPodcastServices.createProviderPodcast(data, req)
    } else {
      throw error
    }
  }

  return res.send(result)
}

router.get('/', wrapAsync(find))
router.get('/:id', wrapAsync(findOneById))
router.put('/', wrapAsync(createOrUpdatePodcast))
router.get('/:id/providers', wrapAsync(findProviderPodcasts))
router.put('/:id/providers', wrapAsync(createOrUpdateProviderPodcasts))

// router.delete('/:id', deletePodcast)

export default router
