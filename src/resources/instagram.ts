import type { CreatorCrawl } from '../client'
import type { JsonRecord, RequestOptions } from '../types'

export type InstagramProfileParams = { handle: string }
export type InstagramBasicProfileParams = { userId: string }
export type InstagramPostsParams = { handle: string; next_max_id?: string }
export type InstagramReelsParams = { user_id?: string; handle?: string; max_id?: string }
export type InstagramPostInfoParams = { url: string }
export type InstagramCommentsParams = { url: string; cursor?: string }
export type InstagramTranscriptParams = { url: string }
export type InstagramStoryHighlightsParams = { user_id?: string; handle?: string }
export type InstagramHighlightsDetailsParams = { id: string }
export type InstagramSearchReelsParams = { query: string }
export type InstagramEmbedParams = { handle: string }

export class Instagram {
  constructor(private readonly client: CreatorCrawl) {}

  profile(params: InstagramProfileParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/instagram/profile', params, options)
  }

  basicProfile(params: InstagramBasicProfileParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/instagram/basic-profile', params, options)
  }

  posts(params: InstagramPostsParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/instagram/user/posts', params, options)
  }

  reels(params: InstagramReelsParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/instagram/user/reels', params, options)
  }

  postInfo(params: InstagramPostInfoParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/instagram/post', params, options)
  }

  comments(params: InstagramCommentsParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/instagram/post/comments', params, options)
  }

  transcript(params: InstagramTranscriptParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/instagram/media/transcript', params, options)
  }

  storyHighlights(params: InstagramStoryHighlightsParams = {}, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/instagram/user/highlights', params, options)
  }

  highlightsDetails(params: InstagramHighlightsDetailsParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/instagram/user/highlight/detail', params, options)
  }

  searchReels(params: InstagramSearchReelsParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/instagram/reels/search', params, options)
  }

  embed(params: InstagramEmbedParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/instagram/user/embed', params, options)
  }
}
