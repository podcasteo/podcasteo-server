import {
  Router,
} from 'express'
import multer from 'multer'

import podcastServices from 'modules/podcasts/services'
import providerPodcastServices from 'modules/providerPodcastEdge/services'
import rankingPodcastServices from 'modules/rankingPodcastEdge/services'
import {
  wrapAsync,
} from 'services/middlewares/error'
import errMiddleware from 'helpers/errors'

const storage = multer.memoryStorage()
const upload = multer({
  storage,
})
const router = Router()

async function find(req, res) {
  const result = await podcastServices.find(req.query)

  return res.send(result)
}

async function findProviderPodcasts(req, res) {
  const result = await providerPodcastServices.find(req.params.id, req.query)

  return res.send(result)
}

async function findRanking(req, res) {
  const result = await rankingPodcastServices.findByDate(req.params.date, req.query)

  return res.send(result)
}

async function findRankingPodcasts(req, res) {
  const result = await rankingPodcastServices.findByPodcast(req.params.id, req.query)

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

async function uploadAvatar(req, res) {
  const {
    id,
  } = req.params
  const {
    file,
  } = req
  let result

  if (file) {
    result = await podcastServices.uploadAvatarFromRest(id, file, req)
  } else {
    throw new Error('MISSING_FILE')
  }

  return res.send(result)
}

async function createOrUpdateProviderPodcasts(req, res) {
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

async function createOrUpdateRankingPodcasts(req, res) {
  const data = {
    ...req.body,
    _to: req.params.id,
  }
  let result

  try {
    result = await rankingPodcastServices.updateRankingPodcast(data, req)
  } catch (error) {
    if (error.status === errMiddleware.notFound().status) {
      result = await rankingPodcastServices.createRankingPodcast(data, req)
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
router.put('/:id/avatar', upload.single('file'), wrapAsync(uploadAvatar))
router.put('/:id/providers', wrapAsync(createOrUpdateProviderPodcasts))
router.get('/:id/rankings', wrapAsync(findRankingPodcasts))
router.put('/:id/rankings', wrapAsync(createOrUpdateRankingPodcasts))

router.get('/rankings/:date', wrapAsync(findRanking))
// router.delete('/:id', deletePodcast)

export default router
