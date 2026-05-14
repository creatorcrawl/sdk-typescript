import type { CreatorCrawl } from '../client'
import type { JsonRecord, RequestOptions } from '../types'

export type YouTubeChannelParams = { handle?: string; channelId?: string }
export type YouTubeChannelVideosParams = { handle?: string; channelId?: string; cursor?: string }
export type YouTubeChannelShortsParams = { handle?: string; channelId?: string; cursor?: string }
export type YouTubeVideoParams = { url: string }
export type YouTubeSearchParams = { query: string; cursor?: string }
export type YouTubeTranscriptParams = { url: string; language?: string }
export type YouTubeCommentsParams = { url: string; cursor?: string }
export type YouTubePlaylistParams = { url: string; cursor?: string }

export class YouTube {
  constructor(private readonly client: CreatorCrawl) {}

  channel(params: YouTubeChannelParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/youtube/channel', params, options)
  }

  channelVideos(params: YouTubeChannelVideosParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/youtube/channel-videos', params, options)
  }

  channelShorts(params: YouTubeChannelShortsParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/youtube/channel-shorts', params, options)
  }

  video(params: YouTubeVideoParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/youtube/video', params, options)
  }

  search(params: YouTubeSearchParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/youtube/search', params, options)
  }

  transcript(params: YouTubeTranscriptParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/youtube/transcript', params, options)
  }

  comments(params: YouTubeCommentsParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/youtube/comments', params, options)
  }

  playlist(params: YouTubePlaylistParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/youtube/playlist', params, options)
  }
}
