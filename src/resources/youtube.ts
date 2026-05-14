import type { CreatorCrawl } from '../client'
import type { JsonRecord, RequestOptions } from '../types'

export type YouTubeChannelParams = { channelId?: string; handle?: string; url?: string }
export type YouTubeChannelVideosParams = {
  channelId?: string
  handle?: string
  sort?: string
  continuationToken?: string
  includeExtras?: boolean | string
}
export type YouTubeChannelShortsParams = {
  handle?: string
  channelId?: string
  sort?: string
  continuationToken?: string
}
export type YouTubeVideoParams = { url: string }
export type YouTubeTranscriptParams = { url: string; language?: string }
export type YouTubeCommentsParams = { url: string; continuationToken?: string; order?: string }
export type YouTubeSearchParams = {
  query: string
  uploadDate?: string
  sortBy?: string
  filter?: string
  continuationToken?: string
  includeExtras?: boolean | string
}
export type YouTubeSearchHashtagParams = {
  hashtag: string
  continuationToken?: string
  type?: string
}
export type YouTubePlaylistParams = { playlist_id: string }
export type YouTubeTrendingShortsParams = Record<string, never>

export class YouTube {
  constructor(private readonly client: CreatorCrawl) {}

  channel(params: YouTubeChannelParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/youtube/channel', params, options)
  }

  channelVideos(params: YouTubeChannelVideosParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/youtube/channel/videos', params, options)
  }

  channelShorts(params: YouTubeChannelShortsParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/youtube/channel/shorts', params, options)
  }

  video(params: YouTubeVideoParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/youtube/video', params, options)
  }

  transcript(params: YouTubeTranscriptParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/youtube/video/transcript', params, options)
  }

  comments(params: YouTubeCommentsParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/youtube/video/comments', params, options)
  }

  search(params: YouTubeSearchParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/youtube/search', params, options)
  }

  searchHashtag(params: YouTubeSearchHashtagParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/youtube/search/hashtag', params, options)
  }

  playlist(params: YouTubePlaylistParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/youtube/playlist', params, options)
  }

  trendingShorts(_params: YouTubeTrendingShortsParams = {}, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/youtube/shorts/trending', undefined, options)
  }
}
