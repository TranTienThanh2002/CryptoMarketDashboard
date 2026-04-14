import { useEffect, useRef } from "react";
import {
  createChart,
  CandlestickSeries,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type UTCTimestamp,
} from "lightweight-charts";
import type { CandleItem } from "../../../shared/types/chart.types";

interface CandlestickChartProps {
  candles: CandleItem[];
  symbol: string;
  interval: string;
}

export const CandlestickChart = ({
  candles,
  symbol,
  interval,
}: CandlestickChartProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const previousKeyRef = useRef<string>("");
  const lastRenderedTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chart = createChart(container, {
      width: Math.max(container.clientWidth, 320),
      height: 420,
      layout: {
        background: { color: "#121a2b" },
        textColor: "#cbd5e1",
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.06)" },
        horzLines: { color: "rgba(255,255,255,0.06)" },
      },
      rightPriceScale: {
        borderColor: "rgba(255,255,255,0.08)",
      },
      timeScale: {
        borderColor: "rgba(255,255,255,0.08)",
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
      borderVisible: false,
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const handleResize = () => {
      if (!containerRef.current || !chartRef.current) return;
      chartRef.current.applyOptions({
        width: Math.max(containerRef.current.clientWidth, 320),
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
      previousKeyRef.current = "";
      lastRenderedTimeRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current || !chartRef.current || candles.length === 0) return;

    const series = seriesRef.current;
    const chart = chartRef.current;
    const currentKey = `${symbol}_${interval}`;

    const mappedData: CandlestickData<UTCTimestamp>[] = candles.map((item) => ({
      time: item.time as UTCTimestamp,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));

    const lastBar = mappedData[mappedData.length - 1];
    const lastBarTime = Number(lastBar.time);

    // change symbol or interval => replace the entire dataset
    if (previousKeyRef.current !== currentKey) {
      previousKeyRef.current = currentKey;
      series.setData(mappedData);
      lastRenderedTimeRef.current = lastBarTime;
      chart.timeScale().fitContent();
      return;
    }

    const lastRenderedTime = lastRenderedTimeRef.current;

    // no old data => set all data again
    if (lastRenderedTime == null) {
      series.setData(mappedData);
      lastRenderedTimeRef.current = lastBarTime;
      return;
    }

    // only update if it's the same last bar or a newer bar
    if (lastBarTime < lastRenderedTime) {
      return;
    }

    series.update(lastBar);
    lastRenderedTimeRef.current = lastBarTime;
  }, [candles, symbol, interval]);

  return <div ref={containerRef} className="min-h-[420px] w-full" />;
};
