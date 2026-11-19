import { io, Socket } from "socket.io-client";

let socketInstance: Socket | null = null;

export const getSocketUrl = (): string => {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SOCKET_URL) {
    return process.env.NEXT_PUBLIC_SOCKET_URL;
  }
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/v1\/?$/, "");
  }
  return "http://localhost:4000";
};

export function getSocket(): Socket {
  if (!socketInstance) {
    const url = getSocketUrl();
    socketInstance = io(url, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      transports: ["websocket", "polling"],
      timeout: 10000,
    });

    socketInstance.on("connect", () => {
      console.log(`[Socket.IO Client] Connected to ${url} (id: ${socketInstance?.id})`);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log(`[Socket.IO Client] Disconnected: ${reason}`);
    });

    socketInstance.on("connect_error", (error) => {
      console.warn(`[Socket.IO Client] Connection error:`, error.message);
    });
  }

  return socketInstance;
}

export function connectSocket(): Socket {
  const socket = getSocket();
  if (!socket.connected) {
    socket.connect();
  }
  return socket;
}

export function disconnectSocket(): void {
  if (socketInstance && socketInstance.connected) {
    socketInstance.disconnect();
  }
}
