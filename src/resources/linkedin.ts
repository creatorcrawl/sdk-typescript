import type { CreatorCrawl } from '../client'
import type { Company, Creator, Envelope, JsonRecord, Post, RequestOptions } from '../types'

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
export type LinkedInSearchPeopleParams = {
  search?: string
  title?: string
  firstName?: string
  lastName?: string
  currentCompany?: string
  pastCompany?: string
  school?: string
  location?: string
  geoId?: string
  industryId?: string
  keywordsCompany?: string
  keywordsSchool?: string
  followerOf?: string
  page?: number | string
}
export type LinkedInProfileByEmailParams = {
  email: string
}
export type LinkedInProfileEmailParams = {
  query: string
}
export type LinkedInProfilePostsParams = {
  profile: string
  postedLimit?: string
  scrapePostedLimit?: string
  page?: number | string
  paginationToken?: string
}
export type LinkedInProfileCommentsParams = {
  profile: string
  postedLimit?: string
  page?: number | string
  paginationToken?: string
}
export type LinkedInProfileReactionsParams = {
  profile: string
  page?: number | string
  paginationToken?: string
}
export type LinkedInSearchCompaniesParams = {
  search?: string
  location?: string
  geoId?: string
  companySize?: string
  industryId?: string
  page?: number | string
}
export type LinkedInCompanyPeopleStatsParams = {
  query: string
}
export type LinkedInCompanyInsightsParams = {
  query: string
}
export type LinkedInSearchAccountsParams = {
  search?: string
  headquarterLocations?: string
  headquarterGeoIds?: string
  industryIds?: string
  companyHeadcount?: string
  companyHeadcountGrowth?: string
  annualRevenue?: string
  numOfFollowers?: string
  departmentHeadcount?: string
  departmentHeadcountGrowth?: string
  jobOpportunities?: string
  accountActivities?: string
  fortune?: string
  excludeHeadquarterLocations?: string
  excludeHeadquarterGeoIds?: string
  excludeIndustryIds?: string
  excludeCompanyHeadcount?: string
  page?: number | string
}
export type LinkedInSearchLeadsParams = {
  search?: string
  currentCompanies?: string
  pastCompanies?: string
  currentJobTitles?: string
  pastJobTitles?: string
  firstNames?: string
  lastNames?: string
  locations?: string
  geoIds?: string
  schools?: string
  industryIds?: string
  seniorityLevelIds?: string
  functionIds?: string
  yearsAtCurrentCompanyIds?: string
  yearsOfExperienceIds?: string
  companyHeadcount?: string
  companyHeadquarterLocations?: string
  profileLanguages?: string
  recentlyChangedJobs?: boolean | string
  postedOnLinkedin?: boolean | string
  excludeLocations?: string
  excludeGeoIds?: string
  excludeCurrentCompanies?: string
  excludePastCompanies?: string
  excludeSchools?: string
  excludeCurrentJobTitles?: string
  excludePastJobTitles?: string
  excludeIndustryIds?: string
  excludeSeniorityLevelIds?: string
  excludeFunctionIds?: string
  excludeCompanyHeadquarterLocations?: string
  salesNavUrl?: string
  page?: number | string
}
export type LinkedInJobParams = {
  url?: string
  jobId?: string
}
export type LinkedInSearchJobsParams = {
  search?: string
  companyId?: string
  location?: string
  geoId?: string
  sortBy?: string
  workplaceType?: string
  employmentType?: string
  salary?: string
  postedLimit?: string
  experienceLevel?: string
  industryId?: string
  functionId?: string
  under10Applicants?: boolean | string
  easyApply?: string
  page?: number | string
}
export type LinkedInSearchLocationParams = {
  search: string
}
export type LinkedInSearchPostsParams = {
  search?: string
  profile?: string
  company?: string
  authorsCompany?: string
  authorsIndustryId?: string
  authorKeywords?: string
  mentioningMember?: string
  mentioningCompany?: string
  contentType?: string
  group?: string
  postedLimit?: string
  scrapePostedLimit?: string
  sortBy?: string
  page?: number | string
  paginationToken?: string
}
export type LinkedInPostCommentsParams = {
  post: string
  sortBy?: string
  page?: number | string
  paginationToken?: string
}
export type LinkedInCommentRepliesParams = {
  url: string
  paginationToken?: string
}
export type LinkedInPostReactionsParams = {
  post: string
  page?: number | string
}
export type LinkedInCommentReactionsParams = {
  url: string
  page?: number | string
}
export type LinkedInGroupParams = {
  url?: string
  groupId?: string
}
export type LinkedInSearchGroupsParams = {
  search: string
  page?: number | string
}
export type LinkedInSearchServicesParams = {
  search: string
  location?: string
  geoId?: string
  page?: number | string
}

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

  searchPeople(params: LinkedInSearchPeopleParams = {}, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/search/people', params, options)
  }

  profileByEmail(params: LinkedInProfileByEmailParams, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/profile/by-email', params, options)
  }

  profileEmail(params: LinkedInProfileEmailParams, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/profile/email', params, options)
  }

  profilePosts(params: LinkedInProfilePostsParams, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/profile/posts', params, options)
  }

  profileComments(params: LinkedInProfileCommentsParams, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/profile/comments', params, options)
  }

  profileReactions(params: LinkedInProfileReactionsParams, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/profile/reactions', params, options)
  }

  searchCompanies(params: LinkedInSearchCompaniesParams = {}, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/search/companies', params, options)
  }

  companyPeopleStats(params: LinkedInCompanyPeopleStatsParams, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/company/people-stats', params, options)
  }

  companyInsights(params: LinkedInCompanyInsightsParams, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/company/insights', params, options)
  }

  searchAccounts(params: LinkedInSearchAccountsParams = {}, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/search/accounts', params, options)
  }

  searchLeads(params: LinkedInSearchLeadsParams = {}, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/search/leads', params, options)
  }

  job(params: LinkedInJobParams, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/job', params, options)
  }

  searchJobs(params: LinkedInSearchJobsParams = {}, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/search/jobs', params, options)
  }

  searchLocation(params: LinkedInSearchLocationParams, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/search/location', params, options)
  }

  searchPosts(params: LinkedInSearchPostsParams = {}, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/search/posts', params, options)
  }

  postComments(params: LinkedInPostCommentsParams, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/post/comments', params, options)
  }

  commentReplies(params: LinkedInCommentRepliesParams, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/post/comments/replies', params, options)
  }

  postReactions(params: LinkedInPostReactionsParams, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/post/reactions', params, options)
  }

  commentReactions(params: LinkedInCommentReactionsParams, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>(
      '/linkedin/post/comments/reactions',
      params,
      options,
    )
  }

  group(params: LinkedInGroupParams, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/group', params, options)
  }

  searchGroups(params: LinkedInSearchGroupsParams, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/search/groups', params, options)
  }

  searchServices(params: LinkedInSearchServicesParams, options?: RequestOptions) {
    return this.client.get<Envelope<JsonRecord>>('/linkedin/search/services', params, options)
  }
}
