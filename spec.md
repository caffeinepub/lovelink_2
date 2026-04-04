# LoveLink

## Current State
LoveLink is a decentralized dating PWA with EVM wallet + Internet Identity login, geolocation-based discovery, tipping (AFUK/USDC/ICP), and real-time chat. The bottom navigation bar on mobile has 5 tabs: Explore, Messages, Matches, Notifications, Profile. There is no Wallet tab.

## Requested Changes (Diff)

### Add
- New `/wallet` route and `WalletPage` component
- Wallet tab added to the bottom navigation bar (mobile) and desktop nav, using a Wallet icon
- WalletPage shows:
  1. **Token Balances section**: Display balances for $USDC, $BTC, $ETH, and ICP (fetched from connected wallet / mocked if not available)
  2. **Buy AFUK Token section**: Prominent CTA to buy AFUK Token on Base Mainnet
     - Shows AFUK Token contract address: `0x2d0A4446f11Ff1554F4E387DA2162d8276daDE5d` with a copy button
     - "Buy on Uniswap" button that deeplinks to Uniswap with the AFUK contract address pre-filled on Base
     - "Buy on Base" or similar secondary link
     - Shows AFUK token branding (logo)
  3. Connected wallet address display
  4. Dark glassmorphic styling consistent with rest of app (purple accents)

### Modify
- `Layout.tsx`: Add `/wallet` link with Wallet icon to both desktop nav and mobile bottom pill nav
- `App.tsx`: Add lazy import and Route for WalletPage at `/wallet`

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/pages/WalletPage.tsx` with:
   - Header showing connected wallet address (from AuthContext)
   - Token balances card: $USDC, $BTC, $ETH, ICP with placeholder/mock values and icons
   - Buy AFUK section: logo, contract address with copy-to-clipboard, Uniswap deeplink button, Basescan link
   - Dark glassmorphic styling with purple gradients
2. Update `Layout.tsx` to add Wallet tab to both desktop and mobile nav (NAV_LINKS array)
3. Update `App.tsx` to add lazy import for WalletPage and Route at `/wallet`
