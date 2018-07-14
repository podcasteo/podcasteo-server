module.exports = {
  server: {
    port: '3000',
  },
  arango: {
    host: 'http://localhost:8529',
    user: {
      login: 'root',
      password: 'root',
    },
    database: 'podcasteo',
    collections: {
      // Collections
      users: 'Users',
      groups: 'Groups',
      podcasts: 'Podcasts',
      ranking: 'Ranking',
      providerData: 'ProviderData',
      Stats: 'Stats',
      // Edges
      //    Podcast
      likePodcastEdge: 'LikePodcastEdge',
      memberPodcastEdge: 'MemberPodcastEdge',
      providerPodcast: 'ProviderPodcast',
      providerPodcastEdge: 'ProviderPodcastEdge',
      rankingPodcast: 'RankingPodcast',
      rankingPodcastEdge: 'RankingPodcastEdge',
      //    Group
      likeGroupEdge: 'LikeGroupEdge',
      memberGroupEdge: 'MemberGroupEdge',
      //    User
      followUserEdge: 'FollowUserEdge',
    },
  },
  jwt: {
    secretKey: 'JWT_SECRET_KEY',
    expiresIn: '60d',
  },
  cloudinary: {
    config: {
      cloud_name: 'podcasteo',
      api_key: 'apikey',
      api_secret: 'apisecret',
    },
  },
}
