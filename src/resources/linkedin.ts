import type { CreatorCrawl } from '../client'
import type {
  Company,
  Creator,
  Envelope,
  JsonRecord,
  Post,
  RequestOptions,
} from '../types'

export type LinkedInProfileParams = { url: string }
export type LinkedInCompanyParams = { url: string }
export type LinkedInCompanyPostsParams = { url: string; page?: number | string }
export type LinkedInPostParams = { url: string }
export type LinkedInAdsSearchParams = {
  company?: string
  keyword?: string
  companyId?: string
  countries?: string
  startDate?: string
  endDate?: string
  paginationToken?: string
}
export type LinkedInAdParams = { url: string }

export class LinkedIn {
  constructor(private readonly client: CreatorCrawl) {}

  profile(params: LinkedInProfileParams, options?: RequestOptions) {
    return this.client.get<Envelope<Creator>>('/linkedin/profile', params, options)
  }

  company(params: LinkedInCompanyParams, options?: RequestOptions) {
    return this.client.get<Envelope<Company>>('/linkedin/company', params, options)
  }

  companyPosts(params: LinkedInCompanyPostsParams, options?: RequestOptions) {
    return this.client.get<Envelope<Post[]>>('/linkedin/company/posts', params, options)
  }

  post(params: LinkedInPostParams, options?: RequestOptions) {
    return this.client.get<Envelope<Post>>('/linkedin/post', params, options)
  }

  adsSearch(params: LinkedInAdsSearchParams = {}, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord[]>>('/linkedin/ads/search', params, options)
  }

  ad(params: LinkedInAdParams, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/ad', params, options)
  }
}
