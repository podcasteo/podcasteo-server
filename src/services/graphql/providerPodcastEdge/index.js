export default `
  enum ProviderPodcastTypeEnum {
    itunes
    facebook
    twitter
    soundcloud
    spotify
    youtube
    patreon
  }

  type ProviderPodcast {
    trackCount: Int
    lastRelease: Date
    ratingCount: Int
    frequency: Int
    followers: Int
  }

  type ProviderPodcastEdge {
    id: String
    type: ProviderPodcastTypeEnum
    createdAt: Date
    data: ProviderPodcast
  }

  type ProviderPodcastEdges {
    pageInfo: PageInfo
    data: [ProviderPodcastEdge]
  }
`
