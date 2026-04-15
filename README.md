# Crypto Market Dashboard

A real-time cryptocurrency dashboard built with **React + TypeScript**.  
The application displays live market data from Binance and includes charting, recent trades, order book depth, localization, theme/avatar settings, persistence, and responsive UX.

## Tech Stack

- **Language:** TypeScript
- **Framework:** React (Functional Components, Hooks)
- **State Management:** MobX + SatchelJS
- **Real-time Data:** Native WebSocket API
- **Styling:** TailwindCSS
- **Charting:** Lightweight Charts
- **HTTP Client:** Axios
- **Bundler:** Parcel
- **Notifications:** react-hot-toast

---

## Features

### Core Features

#### 1. Real-time Market Dashboard

- Displays cryptocurrency trading pairs on the home dashboard
- Fetches the initial list of pairs from Binance REST API
- Connects to Binance WebSocket API for real-time market price updates
- Displays:
  - Symbol
  - Current Price
  - 24h Price Change (%)
- Highlights price movement:
  - Green when price increases
  - Red when price decreases

#### 2. Token Details & Charting

- Search and filter trading pairs
- Open token details in a modal
- Candlestick chart using Binance historical kline data
- Realtime current candle updates via WebSocket
- Chart interval switching:
  - 1m
  - 5m
  - 15m
  - 1h
  - 4h

#### 3. User Settings & Localization

- Language switcher
- English / Vietnamese localization for main UI elements
- Theme toggle (Light / Dark)
- User avatar upload with local persistence

---

## Bonus / Advanced Features

### Favorites / Watchlist

- Star favorite trading pairs
- Keep favorites pinned to the top
- Favorites tab for quick filtering
- Favorites persisted in localStorage

### Recent Trades Feed

- Realtime trades stream for the selected token
- Separate recent trades panel in token detail modal
- Limited trade history to keep UI responsive

### Real-time Order Book

- Realtime order book depth for the selected token
- Separate bids / asks display
- Top levels kept compact for easier reading

### Responsive Design

- Responsive dashboard layout
- Responsive chart modal
- Adaptive layout for chart, trades, and order book panels

### Resilient Connections

- WebSocket reconnect logic with exponential backoff
- Connection status indicators:
  - Connecting
  - Live
  - Reconnecting
  - Disconnected

### Robust UX

- Skeleton loading states
- Empty states
- Error banners for failed API/stream operations
- Toast notifications
- Error boundary for unexpected rendering/runtime errors
- Retry actions for chart, trades, and order book

### Advanced Settings & Persistence

- Language persisted in localStorage
- Theme persisted in localStorage
- Avatar persisted in localStorage
- Favorites persisted in localStorage
- Settings integrated into SatchelJS state

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/TranTienThanh2002/CryptoMarketDashboard.git
cd crypto-dasboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Rename `.env.example` to `.env` and update values if needed.

Example:

```env
BINANCE_REST_BASE_URL=https://api.binance.com/api/v3
BINANCE_WS_BASE_URL=wss://stream.binance.com:9443/ws
DEFAULT_KLINE_INTERVAL=15m
DEFAULT_MARKET_LIMIT=30
```

### 4. Run the project

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

---

## Available Scripts

### `npm run dev`

Starts the development server.

### `npm run build`

Builds the project for production.

### `npm run typecheck`

Runs TypeScript type checking if configured in `package.json`.

---

## Project Structure

```bash
src/
├── app/
│   ├── actions/
│   ├── mutators/
│   ├── orchestrators/
│   └── store/
├── modules/
│   ├── market/
│   ├── token-detail/
│   └── settings/
├── services/
│   ├── api/
│   └── websocket/
├── shared/
│   ├── components/
│   ├── constants/
│   ├── i18n/
│   ├── types/
│   └── utils/
├── App.tsx
└── main.tsx
```

---

## Architectural Decisions

### 1. SatchelJS + MobX for predictable state flow

The project follows the **Store → Action → Mutator → Orchestrator** pattern.

- **Store:** central application state
- **Actions:** describe what happened
- **Mutators:** pure state updates
- **Orchestrators:** side effects such as REST requests, persistence, and WebSocket connections

This structure was chosen to:

- keep side effects isolated
- make state transitions predictable
- keep feature logic scalable and easier to maintain

### 2. Separate API and WebSocket layers

REST and WebSocket logic are separated into dedicated service modules.

This helps:

- isolate networking concerns
- make realtime and historical data flows easier to reason about
- reduce coupling between UI and data transport

### 3. Modal-based token detail workflow

Instead of routing to a separate detail page, token details are opened in a modal.

This was chosen because:

- it keeps the dashboard context visible
- it makes repeated token inspection faster
- it supports quick switching between markets

### 4. Local persistence for client-side settings

Favorites, language, theme, and avatar are persisted in `localStorage`.

This was chosen because:

- these values are client-side user preferences
- they do not need to be sent to the server
- it keeps the implementation simple and appropriate for a frontend assessment

### 5. Realtime performance and resilience

Realtime streams are handled with dedicated socket managers and reconnect behavior.

This helps:

- recover from temporary network interruptions
- keep chart/trades/order book streams isolated
- support clearer connection state reporting in the UI

### 6. UX-first dashboard decisions

The dashboard includes skeleton loading, empty states, retry actions, toasts, and an error boundary.

This was chosen to:

- improve perceived responsiveness
- make failures easier to understand
- avoid poor UX during temporary API or WebSocket failures

---

## Data Sources

### Binance REST API

- `GET /exchangeInfo` for trading pairs
- `GET /klines` for historical candlestick data
- `GET /depth` for order book snapshot

### Binance WebSocket API

- `!miniTicker@arr` for market updates
- `<symbol>@kline_<interval>` for realtime candle updates
- `<symbol>@trade` for realtime recent trades
- `<symbol>@depth10@100ms` for realtime order book depth

---

## Notes / Trade-offs

- The project prioritizes clean architecture and practical realtime UX over adding excessive complexity.
- The order book implementation is intentionally compact to keep rendering predictable and readable.
- Avatar persistence is handled locally and is intended as a lightweight user setting for the assessment.
- The modal-based token detail view was chosen over route navigation to support faster dashboard-driven workflows.

---

## Future Improvements

- Stronger request cancellation / stale response protection across all async flows
- Virtualized market list for larger datasets
- More advanced reconnect analytics and stream diagnostics
- More complete localization coverage for every UI string
- Automated tests for store/orchestrator flows
- Accessibility polish for keyboard and screen reader support

---

## Submission Notes

This project was built to demonstrate:

- clean architecture
- strict separation of state and side effects
- realtime data handling with native WebSocket APIs
- TypeScript typing discipline
- practical product decisions for dashboard UX
- incremental enhancement from core requirements to bonus features
