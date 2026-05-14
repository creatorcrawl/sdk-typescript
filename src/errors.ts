export class CreatorCrawlError extends Error {
  readonly status: number
  readonly code?: string
  readonly response?: unknown

  constructor(message: string, status: number, code?: string, response?: unknown) {
    super(message)
    this.name = 'CreatorCrawlError'
    this.status = status
    this.code = code
    this.response = response
  }
}

export class AuthenticationError extends CreatorCrawlError {
  constructor(message = 'Invalid API key', response?: unknown) {
    super(message, 401, 'authentication_error', response)
    this.name = 'AuthenticationError'
  }
}

export class InsufficientCreditsError extends CreatorCrawlError {
  constructor(message = 'Insufficient credits', response?: unknown) {
    super(message, 402, 'insufficient_credits', response)
    this.name = 'InsufficientCreditsError'
  }
}

export class RateLimitError extends CreatorCrawlError {
  constructor(message = 'Rate limit exceeded', response?: unknown) {
    super(message, 429, 'rate_limit', response)
    this.name = 'RateLimitError'
  }
}

export class UpstreamError extends CreatorCrawlError {
  constructor(message = 'Upstream platform error', response?: unknown) {
    super(message, 502, 'upstream_error', response)
    this.name = 'UpstreamError'
  }
}
