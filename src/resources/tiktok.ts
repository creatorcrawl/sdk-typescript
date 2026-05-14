import type { CreatorCrawl } from '../client'
import type { JsonRecord, RequestOptions } from '../types'

export type TikTokProfileParams = { handle: string }
export type TikTokProfileVideosParams = { handle: string; maxCursor?: number }
export type TikTokVideoInfoParams = { url: string }
export type TikTokTranscriptParams = { url: string; language?: string }
export type TikTokSearchKeywordParams = { query: string; cursor?: number }
export type TikTokSearchUsersParams = { query: string; cursor?: number }
export type TikTokCommentsParams = { url: string; cursor?: number }

export class TikTok {
  constructor(private readonly client: CreatorCrawl) {}

  profile(params: TikTokProfileParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/profile', params, options)
  }

  profileVideos(params: TikTokProfileVideosParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/profile-videos', params, options)
  }

  videoInfo(params: TikTokVideoInfoParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/video-info', params, options)
  }

  transcript(params: TikTokTranscriptParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/transcript', params, options)
  }

  searchKeyword(params: TikTokSearchKeywordParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/search-keyword', params, options)
  }

  searchUsers(params: TikTokSearchUsersParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/search-users', params, options)
  }

  comments(params: TikTokCommentsParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/tiktok/comments', params, options)
  }
}
