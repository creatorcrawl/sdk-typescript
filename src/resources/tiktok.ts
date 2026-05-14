import type { CreatorCrawl } from '../client'
import type { JsonRecord, RequestOptions } from '../types'

export type TikTokProfileParams = { handle: string }
export type TikTokProfileVideosParams = {
  handle?: string
  user_id?: string
  sort_by?: string
  max_cursor?: number | string
  region?: string
  trim?: boolean | string
}
export type TikTokVideoInfoParams = {
  url: string
  get_transcript?: boolean | string
  region?: string
  trim?: boolean | string
}
export type TikTokTranscriptParams = {
  url: string
  language?: string
  use_ai_as_fallback?: boolean | string
}
export type TikTokCommentsParams = { url: string; cursor?: number | string; trim?: boolean | string }
export type TikTokCreatorTranscriptsParams = { handle: string; count?: number; language?: string }
export type TikTokFollowersParams = {
  handle?: string
  user_id?: string
  min_time?: number
  trim?: boolean | string
}
export type TikTokFollowingParams = {
  handle: string
  min_time?: number
  trim?: boolean | string
}
export type TikTokLiveParams = { handle: string }
export type TikTokSongDetailsParams = { clipId: string }
export type TikTokSongVideosParams = { clipId: string; cursor?: number | string }
export type TikTokSearchKeywordParams = {
  query: string
  date_posted?: string
  sort_by?: string
  region?: string
  cursor?: number | string
  trim?: boolean | string
}
export type TikTokSearchUsersParams = { query: string; cursor?: number | string; trim?: boolean | string }
export type TikTokSearchTopParams = {
  query: string
  publish_time?: string
  sort_by?: string
  region?: string
  cursor?: number | string
}
export type TikTokSearchHashtagParams = {
  hashtag: string
  region?: string
  cursor?: number | string
  trim?: boolean | string
}
export type TikTokPopularCreatorsParams = {
  page?: number | string
  sortBy?: string
  followerCount?: string
  creatorCountry?: string
  audienceCountry?: string
}
export type TikTokPopularHashtagsParams = {
  period?: string
  page?: number | string
  countryCode?: string
  newOnBoard?: string
  industry?: string
}
export type TikTokPopularSongsParams = {
  page?: number | string
  timePeriod?: string
  rankType?: string
  newOnBoard?: string
  commercialMusic?: string
  countryCode?: string
}
export type TikTokPopularVideosParams = {
  period?: string
  page?: number | string
  orderBy?: string
  countryCode?: string
}
export type TikTokTrendingFeedParams = { region?: string; trim?: boolean | string }

export class TikTok {
  constructor(private readonly client: CreatorCrawl) {}

  profile(params: TikTokProfileParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/profile', params, options)
  }

  profileVideos(params: TikTokProfileVideosParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/profile/videos', params, options)
  }

  videoInfo(params: TikTokVideoInfoParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/video', params, options)
  }

  transcript(params: TikTokTranscriptParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/video/transcript', params, options)
  }

  comments(params: TikTokCommentsParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/video/comments', params, options)
  }

  creatorTranscripts(params: TikTokCreatorTranscriptsParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/creator/transcripts', params, options)
  }

  followers(params: TikTokFollowersParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/user/followers', params, options)
  }

  following(params: TikTokFollowingParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/user/following', params, options)
  }

  live(params: TikTokLiveParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/user/live', params, options)
  }

  songDetails(params: TikTokSongDetailsParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/song', params, options)
  }

  songVideos(params: TikTokSongVideosParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/song/videos', params, options)
  }

  searchKeyword(params: TikTokSearchKeywordParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/search/keyword', params, options)
  }

  searchUsers(params: TikTokSearchUsersParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/search/users', params, options)
  }

  searchTop(params: TikTokSearchTopParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/search/top', params, options)
  }

  searchHashtag(params: TikTokSearchHashtagParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/search/hashtag', params, options)
  }

  popularCreators(params: TikTokPopularCreatorsParams = {}, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/creators/popular', params, options)
  }

  popularHashtags(params: TikTokPopularHashtagsParams = {}, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/hashtags/popular', params, options)
  }

  popularSongs(params: TikTokPopularSongsParams = {}, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/songs/popular', params, options)
  }

  popularVideos(params: TikTokPopularVideosParams = {}, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/videos/popular', params, options)
  }

  trendingFeed(params: TikTokTrendingFeedParams = {}, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/get-trending-feed', params, options)
  }
}
