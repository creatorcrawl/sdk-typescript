import type { CreatorCrawl } from '../client'
import type {
  Comment,
  CreatorWithPosts,
  Envelope,
  JsonRecord,
  Post,
  RequestOptions,
  Transcript,
} from '../types'

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
  uploadDate?: 'today' | 'this_week' | 'this_month' | 'this_year'
  sortBy?: 'relevance' | 'popular'
  type?: 'videos' | 'shorts' | 'channels' | 'playlists'
  duration?: 'under_3_min' | 'between_3_and_20_min' | 'over_20_min'
  region?: string
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
    return this.client.get<Envelope<CreatorWithPosts>>('/youtube/channel', params, options)
  }

  channelVideos(params: YouTubeChannelVideosParams, options?: RequestOptions) {
    return this.client.get<Envelope<Post[]>>('/youtube/channel/videos', params, options)
  }

  channelShorts(params: YouTubeChannelShortsParams, options?: RequestOptions) {
    return this.client.get<Envelope<Post[]>>('/youtube/channel/shorts', params, options)
  }

  video(params: YouTubeVideoParams, options?: RequestOptions) {
    return this.client.get<Envelope<Post>>('/youtube/video', params, options)
  }

  transcript(params: YouTubeTranscriptParams, options?: RequestOptions) {
    return this.client.get<Envelope<Transcript>>('/youtube/video/transcript', params, options)
  }

  comments(params: YouTubeCommentsParams, options?: RequestOptions) {
    return this.client.get<Envelope<Comment[]>>('/youtube/video/comments', params, options)
  }

  search(params: YouTubeSearchParams, options?: RequestOptions) {
    return this.client.get<Envelope<Post[]>>('/youtube/search', params, options)
  }

  searchHashtag(params: YouTubeSearchHashtagParams, options?: RequestOptions) {
    return this.client.get<Envelope<Post[]>>('/youtube/search/hashtag', params, options)
  }

  playlist(params: YouTubePlaylistParams, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/youtube/playlist', params, options)
  }

  trendingShorts(_params: YouTubeTrendingShortsParams = {}, options?: RequestOptions) {
    return this.client.get<Envelope<Post[]>>('/youtube/shorts/trending', undefined, options)
  }
}
