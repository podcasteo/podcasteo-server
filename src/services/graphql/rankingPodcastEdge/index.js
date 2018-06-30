import rankingPodcastServices from 'modules/rankingPodcastEdge/services'

export default `
  type RankingPodcast {
    id: String
    score: Int
    ranking: Int
    grade: String
    audienceScore: Int
    audienceGrade: String
    frequencyScore: Int
    frequencyGrade: String
    networkScore: Int
    networkGrade: String
    itunesScore: Int
    itunesGrade: String
    traineeScore: Int
    traineeGrade: String
  }

  type RankingPodcastEdge {
    id: String
    createdAt: Date
    _from: String
    _to: String
    data: RankingPodcast
    podcast: Podcast
    previous: RankingPodcastEdge
  }

  type RankingPodcastEdges {
    pageInfo: PageInfo
    data: [RankingPodcastEdge]
  }

  extend type Query {
    rankings(first: Int, offset: Int, date: Date!): RankingPodcastEdges
  }
`

export const RankingPodcastEdgeResolver = {
  RankingPodcastEdge: {
    previous: (rankingPodcastEdge) => rankingPodcastServices.findOnePrevious(rankingPodcastEdge._to, rankingPodcastEdge.createdAt),
  },
  Query: {
    rankings: (root, args) => rankingPodcastServices.findByDate(args.date, {
      first: args.first,
      offset: args.offset,
    }),
  },
}
