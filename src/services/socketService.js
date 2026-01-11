class SocketService {
    constructor() {
        this.socket = null;
        this.listeners = [];
    }

    connect() {
        if (this.socket) return;

        this.socket = new WebSocket("wss://ws.postman-echo.com/raw");

        this.socket.onopen = () => {
            console.log("WebSocket connected");
        };

        this.socket.onmessage = (event) => {
            this.listeners.forEach((cb) => cb(event.data));
        };

        this.socket.onclose = () => {
            console.log("WebSocket disconnected, reconnecting in 3s...");
            this.socket = null;
            setTimeout(() => this.connect(), 3000);
        };

        this.socket.onerror = () => {
            this.socket.close();
        };
    }

    sendMessage(message) {
        if (this.socket?.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        }
    }

    addListener(callback) {
        this.listeners.push(callback);
    }
}

export const socketService = new SocketService();
