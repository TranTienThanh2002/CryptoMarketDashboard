# Crypto Market Dashboard

A real-time cryptocurrency dashboard built with **React + TypeScript**.  
The app displays live market data from Binance, supports token search, favorites, pagination, chart modal, and basic localization.

## Tech Stack

- **Language:** TypeScript
- **Framework:** React (Functional Components, Hooks)
- **State Management:** MobX + SatchelJS
- **Real-time Data:** Native WebSocket API
- **Styling:** TailwindCSS
- **Charting:** Lightweight Charts
- **HTTP Client:** Axios
- **Bundler:** Parcel

---

## Features

### Core Features
- Real-time market dashboard for cryptocurrency pairs
- Initial pair list loaded from Binance REST API
- Live price updates from Binance WebSocket API
- Display:
  - Symbol
  - Current Price
  - 24h Price Change (%)
- Visual price movement highlight:
  - Green when price goes up
  - Red when price goes down

### Token Details & Charting
- Search and filter trading pairs
- Open token detail in a modal
- Candlestick chart using historical kline data
- Realtime current candle updates via WebSocket

### User Settings
- Language switcher
- English / Vietnamese localization for main UI elements

### Extra UX Improvements
- Favorites tab
- Pagination
- Favorites persistence in localStorage

---

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/TranTienThanh2002/CryptoMarketDashboard.git
cd crypto-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the project
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

---

## Environment Notes

This project uses environment-based constraints in the current setup.

Depending on your local configuration, you may need to provide environment values for:
- API base URL constraints
- WebSocket endpoint constraints
- feature toggles or runtime restrictions if applied in your local environment

Change filename of `.env.example` to `.env` file, make sure it is configured correctly before running the app.

Example:
```env
BINANCE_REST_BASE_URL = https://api.binance.com/api/v3
BINANCE_WS_BASE_URL = wss://stream.binance.com:9443/ws
DEFAULT_KLINE_INTERVAL = '15m';
DEFAULT_MARKET_LIMIT = 30;
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
- **Mutators:** pure store updates
- **Orchestrators:** side effects such as REST calls and WebSocket connections

This structure was chosen to:
- keep side effects isolated
- make state changes predictable
- keep feature logic scalable and easier to maintain

### 2. Separate API and WebSocket layers
REST and WebSocket logic are split into dedicated service modules.

This helps:
- isolate networking concerns
- make realtime and historical data flows easier to reason about
- reduce coupling between UI and transport logic

### 3. Lightweight chart modal instead of page navigation
Instead of navigating to a separate token page, token details are opened in a modal.

This was chosen because:
- it keeps the dashboard context visible
- it makes quick token inspection faster
- it improves usability for repeated market scanning

### 4. Local persistence for user preferences
Favorites and language preferences are persisted with `localStorage`.

This approach was chosen because:
- these values are client-side preferences
- they do not need to be sent to the server
- it keeps the implementation simple for a frontend technical assessment

### 5. TailwindCSS for fast UI iteration
TailwindCSS was selected to speed up UI development while keeping the styling system consistent and easy to adjust.

---

## Data Sources

### Binance REST API
- `GET /exchangeInfo` for trading pairs
- `GET /klines` for historical candlestick data

### Binance WebSocket API
- `!miniTicker@arr` for market updates
- `<symbol>@kline_<interval>` for realtime candle updates

---

## Notes / Trade-offs

- The project focuses on clean architecture and core product behavior first.
- Some advanced production concerns can still be improved further, such as:
  - more robust reconnect handling
  - deeper error recovery UX
  - broader localization coverage
  - additional performance optimizations for very high update frequency

---

## Future Improvements

- Theme switcher with persistence
- Recent trades feed
- Order book
- Stronger reconnect status UI
- Better loading skeletons and error states
- Full test coverage

---

## Submission Notes

This project was built to demonstrate:
- clean architecture
- strict separation of state and side effects
- realtime data handling
- TypeScript typing discipline
- practical UI/UX decisions for a dashboard workflow
