import config from 'config'

import {
  dataModel,
  edgeModel,
  selector,
} from 'modules/providerPodcastEdge/client/database/schema'
import ArangoAccessor from 'helpers/arangoAccessor'

export const providerPodcastAccessor = new ArangoAccessor(config.get('arango.collections.providerPodcast'), {
  model: dataModel,
  selector,
})

export const providerPodcastEdgeAccessor = new ArangoAccessor(config.get('arango.collections.providerPodcastEdge'), {
  model: edgeModel,
  selector,
})
