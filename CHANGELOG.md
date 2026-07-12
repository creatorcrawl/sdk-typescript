# Changelog

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
