import type { CreatorCrawl } from '../client'
import type {
  CreatorWithPosts,
  Envelope,
  JsonRecord,
  Post,
  RequestOptions,
  Transcript,
} from '../types'

export type TwitterProfileParams = { handle: string }
export type TwitterTweetParams = { url: string; trim?: boolean | string }
export type TwitterUserTweetsParams = { handle: string; trim?: boolean | string }
export type TwitterTranscriptParams = { url: string }
export type TwitterCommunityParams = { url: string }
export type TwitterCommunityTweetsParams = { url: string }

export class Twitter {
  constructor(private readonly client: CreatorCrawl) {}

  profile(params: TwitterProfileParams, options?: RequestOptions) {
    return this.client.get<Envelope<CreatorWithPosts>>('/twitter/profile', params, options)
  }

  tweet(params: TwitterTweetParams, options?: RequestOptions) {
    return this.client.get<Envelope<Post>>('/twitter/tweet', params, options)
  }

  userTweets(params: TwitterUserTweetsParams, options?: RequestOptions) {
    return this.client.get<Envelope<Post[]>>('/twitter/user/tweets', params, options)
  }

  transcript(params: TwitterTranscriptParams, options?: RequestOptions) {
    return this.client.get<Envelope<Transcript>>('/twitter/tweet/transcript', params, options)
  }

  community(params: TwitterCommunityParams, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/twitter/community', params, options)
  }

  communityTweets(params: TwitterCommunityTweetsParams, options?: RequestOptions) {
    return this.client.get<Envelope<Post[]>>('/twitter/community/tweets', params, options)
  }
}
