# @creatorcrawl/sdk

Official TypeScript / JavaScript SDK for the [CreatorCrawl](https://creatorcrawl.com) social media data API.

One typed client, six platforms: **TikTok, Instagram, YouTube, LinkedIn, Twitter/X, and Reddit**. Profiles, posts, comments, transcripts, ads, search, and trending data as structured JSON.

- 60+ endpoints across six platforms
- Fully typed, ESM + CJS, zero runtime dependencies
- Works in Node 18+, Bun, Deno, Cloudflare Workers, and browsers
- Same endpoints are also available as a native MCP server for Claude, Cursor, Windsurf, and Zed

## Install

```bash
npm install @creatorcrawl/sdk
# or
pnpm add @creatorcrawl/sdk
# or
yarn add @creatorcrawl/sdk
```

## Quick start

Get a key at [creatorcrawl.com](https://creatorcrawl.com). 250 credits are free on signup, no card required.

```ts
import { CreatorCrawl } from '@creatorcrawl/sdk'

const cc = new CreatorCrawl({ apiKey: process.env.CREATORCRAWL_API_KEY! })

const profile = await cc.tiktok.profile({ handle: 'khaby.lame' })
const transcript = await cc.youtube.transcript({ url: 'https://youtu.be/...' })
const company = await cc.linkedin.company({ url: 'https://www.linkedin.com/company/openai' })
```

## Resources

```ts
cc.tiktok.profile({ handle })
cc.tiktok.profileVideos({ handle })
cc.tiktok.videoInfo({ url })
cc.tiktok.transcript({ url })
cc.tiktok.searchKeyword({ query })
cc.tiktok.searchUsers({ query })
cc.tiktok.comments({ url })

cc.instagram.profile({ handle })
cc.instagram.posts({ handle })
cc.instagram.postInfo({ url })
cc.instagram.reels({ handle })
cc.instagram.comments({ url })
cc.instagram.transcript({ url })

cc.youtube.channel({ handle })
cc.youtube.channelVideos({ handle })
cc.youtube.channelShorts({ handle })
cc.youtube.video({ url })
cc.youtube.search({ query })
cc.youtube.transcript({ url })
cc.youtube.comments({ url })
cc.youtube.playlist({ url })

cc.linkedin.profile({ url })
cc.linkedin.company({ url })
cc.linkedin.companyPosts({ url })
cc.linkedin.post({ url })
cc.linkedin.adsSearch({ query })
cc.linkedin.ad({ url })

cc.twitter.profile({ handle })
cc.twitter.tweet({ url })
cc.twitter.userTweets({ handle })
cc.twitter.transcript({ url })
cc.twitter.community({ url })
cc.twitter.communityTweets({ url })

cc.reddit.search({ query })
cc.reddit.subredditDetails({ subreddit })
cc.reddit.subredditPosts({ subreddit })
cc.reddit.subredditSearch({ subreddit, query })
cc.reddit.postComments({ url })
```

## Configuration

```ts
const cc = new CreatorCrawl({
  apiKey: 'cc_...',
  baseUrl: 'https://app.creatorcrawl.com/api', // optional
  timeout: 30_000,                             // optional, ms
  fetch: customFetch,                          // optional
})
```

## Error handling

Failed requests throw a typed `CreatorCrawlError`:

```ts
import {
  AuthenticationError,
  CreatorCrawlError,
  InsufficientCreditsError,
  RateLimitError,
  UpstreamError,
} from '@creatorcrawl/sdk'

try {
  await cc.tiktok.profile({ handle: 'khaby.lame' })
} catch (err) {
  if (err instanceof InsufficientCreditsError) {
    // top up credits
  } else if (err instanceof RateLimitError) {
    // back off
  } else if (err instanceof CreatorCrawlError) {
    console.error(err.status, err.message)
  }
}
```

## Cancellation

Every method accepts a `RequestOptions` argument with an `AbortSignal`:

```ts
const controller = new AbortController()
setTimeout(() => controller.abort(), 5_000)

await cc.tiktok.profile({ handle: 'khaby.lame' }, { signal: controller.signal })
```

## Links

- API docs: [creatorcrawl.com/mcp-docs](https://creatorcrawl.com/mcp-docs)
- Pricing: [creatorcrawl.com/#pricing](https://creatorcrawl.com/#pricing)
- MCP server: native MCP at `app.creatorcrawl.com/api/mcp` for AI agents
- Status / issues: [github.com/creatorcrawl/sdk-typescript/issues](https://github.com/creatorcrawl/sdk-typescript/issues)

## License

MIT
