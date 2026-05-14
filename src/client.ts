import {
  AuthenticationError,
  CreatorCrawlError,
  InsufficientCreditsError,
  RateLimitError,
  UpstreamError,
} from './errors'
import { Instagram } from './resources/instagram'
import { LinkedIn } from './resources/linkedin'
import { Reddit } from './resources/reddit'
import { TikTok } from './resources/tiktok'
import { Twitter } from './resources/twitter'
import { YouTube } from './resources/youtube'
import type { CreatorCrawlOptions, JsonRecord, RequestOptions } from './types'

const DEFAULT_BASE_URL = 'https://app.creatorcrawl.com/api'
const DEFAULT_TIMEOUT = 30_000

export class CreatorCrawl {
  readonly tiktok: TikTok
  readonly instagram: Instagram
  readonly youtube: YouTube
  readonly linkedin: LinkedIn
  readonly twitter: Twitter
  readonly reddit: Reddit

  private readonly apiKey: string
  private readonly baseUrl: string
  private readonly fetchImpl: typeof fetch
  private readonly timeout: number

  constructor(options: CreatorCrawlOptions) {
    if (!options.apiKey) {
      throw new Error('CreatorCrawl: apiKey is required')
    }
    this.apiKey = options.apiKey
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, '')
    this.fetchImpl = options.fetch ?? globalThis.fetch
    this.timeout = options.timeout ?? DEFAULT_TIMEOUT

    if (!this.fetchImpl) {
      throw new Error(
        'CreatorCrawl: global fetch is not available. Pass a fetch implementation via options.fetch (e.g. node-fetch).',
      )
    }

    this.tiktok = new TikTok(this)
    this.instagram = new Instagram(this)
    this.youtube = new YouTube(this)
    this.linkedin = new LinkedIn(this)
    this.twitter = new Twitter(this)
    this.reddit = new Reddit(this)
  }

  async get<T = JsonRecord>(
    path: string,
    query?: Record<string, string | number | boolean | undefined>,
    options?: RequestOptions,
  ): Promise<T> {
    const url = this.buildUrl(path, query)
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), this.timeout)
    const signal = options?.signal ?? controller.signal

    try {
      const response = await this.fetchImpl(url, {
        method: 'GET',
        headers: {
          'x-api-key': this.apiKey,
          accept: 'application/json',
          'user-agent': '@creatorcrawl/sdk',
        },
        signal,
      })

      const data = await this.parseBody(response)

      if (!response.ok) {
        throw this.errorFromResponse(response.status, data)
      }

      return data as T
    } finally {
      clearTimeout(timer)
    }
  }

  private buildUrl(
    path: string,
    query?: Record<string, string | number | boolean | undefined>,
  ): string {
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    const url = new URL(`${this.baseUrl}${cleanPath}`)
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value))
        }
      }
    }
    return url.toString()
  }

  private async parseBody(response: Response): Promise<unknown> {
    const text = await response.text()
    if (!text) return null
    try {
      return JSON.parse(text)
    } catch {
      return text
    }
  }

  private errorFromResponse(status: number, body: unknown): CreatorCrawlError {
    const message = this.extractMessage(body) ?? `Request failed with status ${status}`
    if (status === 401) return new AuthenticationError(message, body)
    if (status === 402) return new InsufficientCreditsError(message, body)
    if (status === 429) return new RateLimitError(message, body)
    if (status === 502) return new UpstreamError(message, body)
    return new CreatorCrawlError(message, status, undefined, body)
  }

  private extractMessage(body: unknown): string | undefined {
    if (typeof body === 'string') return body
    if (body && typeof body === 'object') {
      const record = body as JsonRecord
      const candidate = record.error ?? record.message
      if (typeof candidate === 'string') return candidate
    }
    return undefined
  }
}
