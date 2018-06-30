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
  aws: {
    config: {
      accessKeyId: 'nothingtosee',
      secretAccessKey: 'nothingtosee',
      region: 'eu-west-3',
    },
    s3: {
      region: 'eu-west-3',
      params: {
        Bucket: 'podcasteo',
      },
    },
  },
}
