import type { CreatorCrawl } from '../client'
import type { Envelope, JsonRecord, RequestOptions } from '../types'

type Flag = boolean | string
type FacebookCacheParams = { cache_max_age?: string }
type FacebookIdOrUrl = { id?: string; url?: string }

export type FacebookProfileParams = FacebookCacheParams & {
  url: string
  get_business_hours?: Flag
  include_gated_profile?: Flag
}
export type FacebookProfilePostsParams = { url?: string; pageId?: string; cursor?: string }
export type FacebookProfileMediaParams = { url: string; next_page_id?: string; cursor?: string }
export type FacebookProfileEventsParams = { url: string; cursor?: string }
export type FacebookPostParams = FacebookCacheParams & { url: string }
export type FacebookPostCommentsParams = { url?: string; feedback_id?: string; cursor?: string }
export type FacebookCommentRepliesParams = {
  feedback_id: string
  expansion_token: string
  cursor?: string
}
export type FacebookGroupParams = { url?: string; group_id?: string }
export type FacebookGroupPostsParams = FacebookGroupParams & { sort_by?: string; cursor?: string }
export type FacebookCityEventsParams = { url: string; time?: string; cursor?: string }
export type FacebookEventsSearchParams = { query: string; cursor?: string }
export type FacebookEventDetailsParams = FacebookIdOrUrl
export type FacebookMarketplaceSearchParams = {
  query: string
  lat: number | string
  lng: number | string
  radius_km?: number | string
  min_price?: number | string
  max_price?: number | string
  count?: number | string
  sort_by?: string
  delivery_method?: string
  condition?: string
  date_listed?: string
  availability?: string
  cursor?: string
}
export type FacebookMarketplaceItemParams = FacebookIdOrUrl
export type FacebookMarketplaceLocationSearchParams = { query: string }
export type FacebookAdParams = FacebookIdOrUrl & FacebookCacheParams & { trim?: Flag }
export type FacebookAdTranscriptParams = FacebookIdOrUrl & FacebookCacheParams
type FacebookAdFilters = {
  sort_by?: string
  country?: string
  language?: string
  status?: string
  media_type?: string
  start_date?: string
  end_date?: string
  cursor?: string
  trim?: boolean
}
export type FacebookAdsSearchParams = FacebookAdFilters & {
  query: string
  search_type?: string
  ad_type?: string
}
export type FacebookCompanyAdsParams = FacebookAdFilters & {
  pageId?: string
  companyName?: string
}
export type FacebookCompaniesSearchParams = { query: string }

type Data = Envelope<JsonRecord>

export class Facebook {
  constructor(private readonly client: CreatorCrawl) {}

  profile(params: FacebookProfileParams, options?: RequestOptions) {
    return this.client.get<Data>('/facebook/profile', params, options)
  }

  profilePosts(params: FacebookProfilePostsParams, options?: RequestOptions) {
    return this.client.get<Data>('/facebook/profile/posts', params, options)
  }

  profileReels(params: FacebookProfileMediaParams, options?: RequestOptions) {
    return this.client.get<Data>('/facebook/profile/reels', params, options)
  }

  profilePhotos(params: FacebookProfileMediaParams, options?: RequestOptions) {
    return this.client.get<Data>('/facebook/profile/photos', params, options)
  }

  profileEvents(params: FacebookProfileEventsParams, options?: RequestOptions) {
    return this.client.get<Data>('/facebook/profile/events', params, options)
  }

  post(params: FacebookPostParams, options?: RequestOptions) {
    return this.client.get<Data>('/facebook/post', params, options)
  }

  postComments(params: FacebookPostCommentsParams, options?: RequestOptions) {
    return this.client.get<Data>('/facebook/post/comments', params, options)
  }

  commentReplies(params: FacebookCommentRepliesParams, options?: RequestOptions) {
    return this.client.get<Data>('/facebook/post/comment/replies', params, options)
  }

  postTranscript(params: FacebookPostParams, options?: RequestOptions) {
    return this.client.get<Data>('/facebook/post/transcript', params, options)
  }

  group(params: FacebookGroupParams, options?: RequestOptions) {
    return this.client.get<Data>('/facebook/group', params, options)
  }

  groupPosts(params: FacebookGroupPostsParams, options?: RequestOptions) {
    return this.client.get<Data>('/facebook/group/posts', params, options)
  }

  cityEvents(params: FacebookCityEventsParams, options?: RequestOptions) {
    return this.client.get<Data>('/facebook/events', params, options)
  }

  eventsSearch(params: FacebookEventsSearchParams, options?: RequestOptions) {
    return this.client.get<Data>('/facebook/events/search', params, options)
  }

  eventDetails(params: FacebookEventDetailsParams, options?: RequestOptions) {
    return this.client.get<Data>('/facebook/event/details', params, options)
  }

  marketplaceSearch(params: FacebookMarketplaceSearchParams, options?: RequestOptions) {
    return this.client.get<Data>('/facebook/marketplace/search', params, options)
  }

  marketplaceItem(params: FacebookMarketplaceItemParams, options?: RequestOptions) {
    return this.client.get<Data>('/facebook/marketplace/item', params, options)
  }

  marketplaceLocationSearch(
    params: FacebookMarketplaceLocationSearchParams,
    options?: RequestOptions,
  ) {
    return this.client.get<Data>('/facebook/marketplace/location/search', params, options)
  }

  ad(params: FacebookAdParams, options?: RequestOptions) {
    return this.client.get<Data>('/facebook/adLibrary/ad', params, options)
  }

  adTranscript(params: FacebookAdTranscriptParams, options?: RequestOptions) {
    return this.client.get<Data>('/facebook/adLibrary/ad/transcript', params, options)
  }

  adsSearch(params: FacebookAdsSearchParams, options?: RequestOptions) {
    return this.client.post<Data>('/facebook/adLibrary/search/ads', params, options)
  }

  companyAds(params: FacebookCompanyAdsParams, options?: RequestOptions) {
    return this.client.post<Data>('/facebook/adLibrary/company/ads', params, options)
  }

  companiesSearch(params: FacebookCompaniesSearchParams, options?: RequestOptions) {
    return this.client.get<Data>('/facebook/adLibrary/search/companies', params, options)
  }
}
