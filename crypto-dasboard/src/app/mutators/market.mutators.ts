import { mutator } from 'satcheljs';
import { appStore } from '../store/app.store';
import { closeChartModal, connectMiniTickerStream, connectMiniTickerStreamFailure, connectMiniTickerStreamSuccess, loadTradingPairs, loadTradingPairsFailure, loadTradingPairsSuccess, openChartModal, setActiveMarketTab, setMarketPage, setMarketSearchKeyword, setSelectedSymbol, toggleFavoriteSymbol, upsertManyTickers } from '../actions/market.actions';
import { hydrateFavorites } from '../actions/settings.actions';
const store = appStore();
mutator(loadTradingPairs, () => {
  store.market.isLoadingPairs = true;
  store.market.error = null;
});

mutator(loadTradingPairsSuccess, ({ pairs }) => {
  store.market.pairs = pairs;
  store.market.isLoadingPairs = false;
});

mutator(loadTradingPairsFailure, ({ error }) => {
  store.market.isLoadingPairs = false;
  store.market.error = error;
});

mutator(connectMiniTickerStream, () => {
  store.market.isConnectingTickerStream = true;
});

mutator(connectMiniTickerStreamSuccess, () => {
  store.market.isConnectingTickerStream = false;
});

mutator(connectMiniTickerStreamFailure, ({ error }) => {
  store.market.isConnectingTickerStream = false;
  store.market.error = error;
});

mutator(upsertManyTickers, ({ tickers }) => {
  for (const ticker of tickers) {
    store.market.tickers[ticker.symbol] = ticker;
  }
});

mutator(setMarketSearchKeyword, ({ keyword }) => {
  store.market.searchKeyword = keyword;
});

mutator(setSelectedSymbol, ({ symbol }) => {
  store.market.selectedSymbol = symbol;
});


mutator(hydrateFavorites, ({ favorites }) => {
  store.market.favorites = favorites;
});

mutator(setActiveMarketTab, ({ tab }) => {
  store.market.activeTab = tab;
  store.market.currentPage = 1;
});

mutator(setMarketPage, ({ page }) => {
  store.market.currentPage = page;
});

mutator(openChartModal, ({ symbol }) => {
  store.market.selectedSymbol = symbol;
  store.market.isChartModalOpen = true;
});

mutator(closeChartModal, () => {
  store.market.isChartModalOpen = false;
});

mutator(setMarketSearchKeyword, ({ keyword }) => {
  store.market.searchKeyword = keyword;
  store.market.currentPage = 1;
});

mutator(toggleFavoriteSymbol, ({ symbol }) => {
  const exists = store.market.favorites.includes(symbol);

  store.market.favorites = exists
    ? store.market.favorites.filter((item) => item !== symbol)
    : [symbol, ...store.market.favorites];

  store.market.currentPage = 1;
});