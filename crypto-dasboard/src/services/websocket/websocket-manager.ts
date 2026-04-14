type MessageHandler<T> = (payload: T) => void;
type ErrorHandler = (event: Event) => void;
type OpenHandler = () => void;
type CloseHandler = (event: CloseEvent) => void;
type ReconnectHandler = (attempt: number) => void;

export class WebSocketManager<T> {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private reconnectTimer: number | null = null;
  private isManualClose = false;

  constructor(
    private readonly url: string,
    private readonly onMessage: MessageHandler<T>,
    private readonly onOpen?: OpenHandler,
    private readonly onError?: ErrorHandler,
    private readonly onClose?: CloseHandler,
    private readonly onReconnect?: ReconnectHandler,
  ) {}

  connect(): void {
    this.cleanupSocket();
    this.isManualClose = false;

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      this.reconnectAttempts = 0;
      this.onOpen?.();
    };

    this.socket.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data) as T;
        this.onMessage(parsed);
      } catch (error) {
        console.error('WS parse error:', error);
      }
    };

    this.socket.onerror = (event) => {
      this.onError?.(event);
    };

    this.socket.onclose = (event) => {
      this.onClose?.(event);

      if (this.isManualClose) return;
      this.scheduleReconnect();
    };
  }

  disconnect(): void {
    // this.isManualClose = true;

    if (this.reconnectTimer) {
      window.clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    this.cleanupSocket();
  }

  private scheduleReconnect(): void {
    const attempt = this.reconnectAttempts + 1;
    const delay = Math.min(1000 * 2 ** this.reconnectAttempts, 10000);
    this.reconnectAttempts += 1;

    this.onReconnect?.(attempt);

    this.reconnectTimer = window.setTimeout(() => {
      this.connect();
    }, delay);
  }

  private cleanupSocket(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}