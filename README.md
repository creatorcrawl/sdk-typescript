# @creatorcrawl/sdk

Official TypeScript / JavaScript SDK for the [CreatorCrawl](https://creatorcrawl.com) social media data API.

One typed client, six platforms: **TikTok, Instagram, YouTube, LinkedIn, Twitter/X, and Reddit**. Profiles, posts, comments, transcripts, ads, search, and trending data as structured JSON.

- 60+ endpoints across six platforms
- Fully typed, ESM + CJS, zero runtime dependencies
- Works in Node 18+, Bun, Deno, Cloudflare Workers, and browsers
- Same endpoints are also available as a native MCP server for Claude, Cursor, Windsurf, and Zed

## Breaking changes in 0.3

0.3.0 unifies every response under a single canonical envelope. Field names are now `snake_case` and identical across platforms, so a `Creator` from TikTok and one from YouTube share the same shape.

```ts
type Envelope<T> = {
  data: T
  page?: { cursor: string | null; has_more: boolean; total?: number }
  meta: { platform: Platform; fetched_at: string }
}
```

If you were reading raw upstream fields (`legacy.screen_name`, `stats.followerCount`, `data.user.edge_followed_by.count`, etc.), you will need to update your call sites. Method names and parameters are unchanged. See `CHANGELOG.md` for migration notes.

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

## Response shape

Every endpoint returns the same envelope:

```ts
{
  data: T,                    // Creator | Post | Post[] | Comment[] | Transcript | ...
  page?: {                    // present on list endpoints
    cursor: string | null,
    has_more: boolean,
    total?: number
  },
  meta: {
    platform: 'tiktok' | 'instagram' | 'twitter' | 'youtube' | 'reddit' | 'linkedin',
    fetched_at: string        // ISO 8601
  }
}
```

A Twitter profile call:

```ts
const res = await cc.twitter.profile({ handle: 'elonmusk' })
// {
//   data: {
//     id: '44196397',
//     handle: 'elonmusk',
//     name: 'Elon Musk',
//     bio: '...',
//     url: 'https://twitter.com/elonmusk',
//     avatar_url: 'https://...',
//     verified: true,
//     verified_tier: 'blue',
//     follower_count: 200000000,
//     following_count: 800,
//     post_count: 50000,
//     created_at: '2009-06-02T20:12:29.000Z',
//     platform: 'twitter',
//     recent_posts: [ /* Post[] */ ]
//   },
//   meta: { platform: 'twitter', fetched_at: '2025-01-15T12:00:00.000Z' }
// }
```

A TikTok video list:

```ts
const res = await cc.tiktok.profileVideos({ handle: 'khaby.lame' })
// {
//   data: [
//     {
//       id: '7234567890',
//       url: 'https://www.tiktok.com/@khaby.lame/video/7234567890',
//       type: 'video',
//       created_at: '2024-12-01T15:30:00.000Z',
//       text: 'Caption here #fyp',
//       view_count: 12000000,
//       like_count: 1200000,
//       comment_count: 8000,
//       share_count: 50000,
//       author: { id: '...', handle: 'khaby.lame', name: 'Khaby Lame', url: '...', platform: 'tiktok' },
//       hashtags: ['fyp'],
//       platform: 'tiktok'
//     }
//   ],
//   page: { cursor: '1701436200', has_more: true },
//   meta: { platform: 'tiktok', fetched_at: '2025-01-15T12:00:00.000Z' }
// }
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
