import config from 'config'

import {
  dataModel,
  edgeModel,
  selector,
} from 'modules/rankingPodcastEdge/client/database/schema'
import ArangoAccessor from 'helpers/arangoAccessor'

export const rankingPodcastAccessor = new ArangoAccessor(config.get('arango.collections.rankingPodcast'), {
  model: dataModel,
  selector,
})

export const rankingPodcastEdgeAccessor = new ArangoAccessor(config.get('arango.collections.rankingPodcastEdge'), {
  model: edgeModel,
  selector,
})
