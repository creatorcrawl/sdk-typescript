import type { CreatorCrawl } from '../client'
import type { JsonRecord, RequestOptions } from '../types'

export type InstagramProfileParams = { handle: string }
export type InstagramPostsParams = { handle: string; cursor?: string }
export type InstagramPostInfoParams = { url: string }
export type InstagramReelsParams = { handle: string }
export type InstagramCommentsParams = { url: string }
export type InstagramTranscriptParams = { url: string; language?: string }

export class Instagram {
  constructor(private readonly client: CreatorCrawl) {}

  profile(params: InstagramProfileParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/instagram/profile', params, options)
  }

  posts(params: InstagramPostsParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/instagram/posts', params, options)
  }

  postInfo(params: InstagramPostInfoParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/instagram/post-info', params, options)
  }

  reels(params: InstagramReelsParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/instagram/reels', params, options)
  }

  comments(params: InstagramCommentsParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/instagram/comments', params, options)
  }

  transcript(params: InstagramTranscriptParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/instagram/transcript', params, options)
  }
}
