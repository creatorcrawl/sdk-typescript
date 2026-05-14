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
