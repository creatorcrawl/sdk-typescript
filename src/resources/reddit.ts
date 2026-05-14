import type { CreatorCrawl } from '../client'
import type { JsonRecord, RequestOptions } from '../types'

export type RedditSearchParams = {
  query: string
  sort?: string
  timeframe?: string
  after?: string
  trim?: boolean | string
}
export type RedditSubredditDetailsParams = { subreddit?: string; url?: string }
export type RedditSubredditPostsParams = {
  subreddit: string
  timeframe?: string
  sort?: string
  after?: string
  trim?: boolean | string
}
export type RedditSubredditSearchParams = {
  subreddit: string
  query: string
  sort?: string
  timeframe?: string
  cursor?: string
}
export type RedditPostCommentsParams = {
  url: string
  cursor?: string
  trim?: boolean | string
}

export class Reddit {
  constructor(private readonly client: CreatorCrawl) {}

  search(params: RedditSearchParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/reddit/search', params, options)
  }

  subredditDetails(params: RedditSubredditDetailsParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/reddit/subreddit/details', params, options)
  }

  subredditPosts(params: RedditSubredditPostsParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/reddit/subreddit/posts', params, options)
  }

  subredditSearch(params: RedditSubredditSearchParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/reddit/subreddit/search', params, options)
  }

  postComments(params: RedditPostCommentsParams, options?: RequestOptions) {
    return this.client.get<JsonRecord>('/reddit/post/comments', params, options)
  }
}
