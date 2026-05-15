export type CreatorCrawlOptions = {
  apiKey: string
  baseUrl?: string
  fetch?: typeof fetch
  timeout?: number
}

export type RequestOptions = {
  signal?: AbortSignal
}

export type JsonRecord = Record<string, unknown>

export type Platform = 'tiktok' | 'instagram' | 'twitter' | 'youtube' | 'reddit' | 'linkedin'

export type PageInfo = {
  cursor: string | null
  has_more: boolean
  total?: number
}

export type Envelope<T> = {
  data: T
  page?: PageInfo
  meta: {
    platform: Platform
    fetched_at: string
  }
}

export type Creator = {
  id: string | null
  handle: string | null
  name: string | null
  bio: string | null
  url: string | null
  avatar_url: string | null
  verified: boolean | null
  verified_tier?: 'standard' | 'blue' | 'gov' | 'business' | 'creator' | null
  follower_count: number | null
  following_count?: number | null
  post_count?: number | null
  total_likes?: number | null
  view_count?: number | null
  external_url?: string | null
  is_private?: boolean | null
  is_business?: boolean | null
  category?: string | null
  language?: string | null
  region?: string | null
  location?: string | null
  created_at?: string | null
  platform: Platform
}

export type MiniCreator = {
  id: string | null
  handle: string | null
  name: string | null
  url: string | null
  avatar_url?: string | null
  verified?: boolean | null
  platform: Platform
}

export type Media = {
  type: 'image' | 'video' | 'gif'
  url: string
  thumbnail_url?: string
  width?: number
  height?: number
  duration_seconds?: number
}

export type PostType =
  | 'video'
  | 'image'
  | 'carousel'
  | 'text'
  | 'reel'
  | 'short'
  | 'live'
  | 'story'

export type PostMusic = {
  id: string
  title: string
  author: string
  is_original?: boolean
}

export type Post = {
  id: string | null
  url: string | null
  type: PostType
  created_at: string | null
  text: string | null
  language?: string | null
  media?: Media[] | null
  view_count?: number | null
  like_count: number | null
  comment_count: number | null
  share_count?: number | null
  save_count?: number | null
  author: MiniCreator | null
  hashtags?: string[] | null
  mentions?: string[] | null
  is_pinned?: boolean | null
  is_ad?: boolean | null
  is_sponsored?: boolean | null
  is_ai_generated?: boolean | null
  duration_seconds?: number | null
  music?: PostMusic | null
  platform: Platform
}

export type Comment = {
  id: string
  text: string
  created_at: string
  like_count: number
  reply_count?: number
  author: MiniCreator
  parent_id?: string | null
  is_pinned?: boolean
  is_author_reply?: boolean
  platform: Platform
}

export type TranscriptSegment = {
  start_seconds: number
  end_seconds: number
  text: string
}

export type Transcript = {
  language: string | null
  text: string
  segments?: TranscriptSegment[]
}

export type Hashtag = {
  name: string
  post_count?: number
  view_count?: number
  url?: string
  platform: Platform
}

export type Song = {
  id: string
  title: string
  author: string
  url?: string
  cover_url?: string | null
  duration_seconds?: number
  use_count?: number
  is_original?: boolean
  platform: Platform
}

export type Subreddit = {
  id: string
  name: string
  url: string
  title: string | null
  description: string | null
  subscriber_count: number
  active_user_count?: number
  icon_url?: string | null
  banner_url?: string | null
  is_nsfw?: boolean
  created_at?: string | null
  platform: 'reddit'
}

export type Company = {
  id: string | null
  name: string | null
  url: string | null
  description: string | null
  tagline?: string | null
  logo_url?: string | null
  banner_url?: string | null
  website_url?: string | null
  follower_count?: number | null
  employee_count?: number | null
  industry?: string | null
  size?: string | null
  company_type?: string | null
  headquarters?: string | null
  founded_year?: number | null
  city?: string | null
  state?: string | null
  country?: string | null
  specialties?: string[] | null
  website?: string | null
  platform: 'linkedin'
}

export type CreatorWithPosts = Creator & { recent_posts?: Post[] }

export type SubredditWithPosts = {
  subreddit: Subreddit
  recent_posts: Post[]
}
