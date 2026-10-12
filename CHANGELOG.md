# Changelog

## 0.3.5

- Added the `facebook` resource covering all 24 Facebook endpoints: profiles, profile posts/reels/photos/events, posts, comments, comment replies, video transcripts, groups, group posts, city events, event search and details, Marketplace search/item/location search, and the Meta Ad Library (ad, ad transcript, ad search, company ads, company search). `adsSearch` and `companyAds` use the POST variants so long pagination cursors work.
- Added `client.post()` for JSON-body requests.
- The API now returns HTTP 401 for missing or invalid API keys. 401 maps to `AuthenticationError`; 403 with `error.code === 'upstream_forbidden'` maps to `UpstreamError`, and any other 403 still maps to `AuthenticationError` for older API behaviour.

## 0.3.4

- The API now returns HTTP 503 for upstream platform failures. The SDK maps both 502 and 503 to `UpstreamError`, which now carries the actual response status.
- Error messages are read from the nested `{"error":{"code","message"}}` response shape.

## 0.3.3

- Default base URL is now `https://api.creatorcrawl.com`. The legacy `https://app.creatorcrawl.com/api` base keeps working.

## 0.3.2

- Build distribution files automatically when installing the SDK from its Git repository.

## 0.3.1

- Added OAuth bearer authentication through the `accessToken` client option.
- Kept API-key authentication fully compatible through `apiKey`.

## 0.3.0

### Breaking changes

All endpoints now return a single canonical response envelope across every platform, replacing the raw upstream-platform shapes returned by 0.2.x and earlier.

Every response now has the shape:

```ts
type Envelope<T> = {
  data: T
  page?: { cursor: string | null; has_more: boolean; total?: number }
  meta: { platform: Platform; fetched_at: string }
}
```

What this means in practice:

- TikTok profiles return `data.handle` / `data.follower_count` instead of `user.uniqueId` / `stats.followerCount`.
- Twitter profiles return `data.handle` / `data.verified_tier` instead of `legacy.screen_name` / `is_blue_verified`.
- Instagram profiles return `data.follower_count` instead of `data.user.edge_followed_by.count`.
- YouTube channels return `data.handle` / `data.subscriber_count` mapped into `data.follower_count` for cross-platform consistency.
- Reddit, LinkedIn (profile + company), and all post / comment / transcript endpoints follow the same envelope.
- All dates are ISO 8601 strings.
- All field names are `snake_case`.
- Pagination is now consistent: `page.cursor` + `page.has_more` on list endpoints.

### Migration

Method names and parameters are unchanged. Only the response shape changed.

Before (0.2.x):

```ts
const res = await cc.twitter.profile({ handle: 'elonmusk' })
console.log(res.legacy.screen_name, res.legacy.followers_count)
```

After (0.3.0):

```ts
const res = await cc.twitter.profile({ handle: 'elonmusk' })
console.log(res.data.handle, res.data.follower_count)
```

### Added

- Canonical exported types: `Envelope`, `Creator`, `MiniCreator`, `Post`, `Comment`, `Transcript`, `Hashtag`, `Song`, `Subreddit`, `Company`, `Media`, `Platform`, `PageInfo`, plus enums for `PostType`.
- `CreatorWithPosts` and `SubredditWithPosts` helpers for endpoints that return a primary entity plus recent posts.

## 0.2.0

Initial public release.
