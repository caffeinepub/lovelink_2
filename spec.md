# LoveLink

## Current State
LoveLink is a decentralized dating PWA on ICP with profiles, likes/matches, geolocation-based discovery, multi-token tipping (AFUK Token primary), chat, view-once images, blob storage for photos, wallet tab, intent/orientation filtering, and notifications. The backend has tip recording and a `getTopTippedUsers` query that returns a sorted list of principals by total tips received. There is no leaderboard UI and no review/rating system.

## Requested Changes (Diff)

### Add
- **AFUK Tipper Leaderboard page/tab**: Ranked list of top AFUK tippers (users who sent the most tips). Shows rank, avatar, name, total AFUK tipped, and a crown/medal badge for top 3. Accessible from bottom nav.
- **Review system**: Token holders can leave a star rating (1-5) + text review on any user's profile. Reviews stored on-chain. Profile page shows average rating and review list.
- **Backend: `LeaderboardEntry` type**: Combines principal + profile name + total tips sent (not received) for the leaderboard.
- **Backend: `getLeaderboard` query**: Returns top N tippers (by amount sent) with their profile name and total.
- **Backend: `Review` type**: reviewerId, targetId, rating (1-5), text, timestamp.
- **Backend: `submitReview` mutation**: Authenticated user submits review for another user.
- **Backend: `getReviews` query**: Returns all reviews for a given user principal.
- **Backend: `getAverageRating` query**: Returns average star rating for a user.

### Modify
- Bottom navigation: add Leaderboard tab icon (trophy).
- Profile page: show star rating summary and review list beneath profile details.
- App.tsx: add lazy-loaded LeaderboardPage route at `/leaderboard`.
- Router: add `/leaderboard` route.

### Remove
- Nothing removed.

## Implementation Plan
1. Update `main.mo` to add Review type, tips-sent tracking, leaderboard query, review submit/get/average endpoints.
2. Regenerate `backend.d.ts` bindings.
3. Create `LeaderboardPage.tsx` with ranked list UI.
4. Add review UI to `ProfilePage.tsx` (star display + review list + submit form).
5. Add Leaderboard tab to bottom nav in `Layout.tsx` / `Navbar.tsx`.
6. Register `/leaderboard` route in `App.tsx`.
