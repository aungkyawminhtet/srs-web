"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getSocket, connectSocket } from "@/lib/socket";
import { ChatMessage, instructorStore } from "@/lib/instructorStore";

export interface ChatUser {
  name: string;
  role: "instructor" | "student" | "admin";
  email?: string;
}

// Canonical room mapping so instructor (th-1) and student (lin) join the exact same socket room
export function resolveCanonicalRoomId(threadId: string): string {
  if (threadId === "th-1" || threadId === "lin") return "room-lin-emma";
  if (threadId === "th-admin" || threadId === "support") return "room-academic-support";
  if (threadId === "th-maya" || threadId === "maya") return "room-maya-emma";
  return `room-${threadId}`;
}

export function useRealtimeChat({
  threadId,
  currentUser,
  initialMessages = [],
  onMessageReceived,
}: {
  threadId: string;
  currentUser: ChatUser;
  initialMessages?: ChatMessage[];
  onMessageReceived?: (message: ChatMessage, threadId: string) => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activeRoomRef = useRef<string>("");

  // Sync initial messages when thread changes
  useEffect(() => {
    setMessages(initialMessages);
  }, [threadId, initialMessages]);

  // Connect socket and handle room joining
  useEffect(() => {
    const socket = connectSocket();
    const canonicalRoom = resolveCanonicalRoomId(threadId);
    activeRoomRef.current = canonicalRoom;

    const onConnect = () => {
      setIsConnected(true);
      socket.emit("join_thread", {
        threadId: canonicalRoom,
        user: { name: currentUser.name, role: currentUser.role },
      });
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    if (socket.connected) {
      setIsConnected(true);
      socket.emit("join_thread", {
        threadId: canonicalRoom,
        user: { name: currentUser.name, role: currentUser.role },
      });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // Listen for incoming messages
    const handleNewMessage = (rawMsg: any) => {
      if (rawMsg.threadId !== canonicalRoom) return;

      const isMe =
        rawMsg.senderName === currentUser.name ||
        (rawMsg.senderRole === currentUser.role && rawMsg.senderEmail === currentUser.email);

      const incomingMsg: ChatMessage = {
        id: rawMsg.id || `msg-${Date.now()}`,
        senderName: rawMsg.senderName,
        senderRole: rawMsg.senderRole,
        text: rawMsg.text,
        time: rawMsg.time || "Just now",
        isMe: isMe,
      };

      setMessages((prev) => {
        // Prevent duplicate messages
        if (prev.some((m) => m.id === incomingMsg.id || (m.text === incomingMsg.text && m.time === incomingMsg.time && m.senderName === incomingMsg.senderName))) {
          return prev;
        }
        return [...prev, incomingMsg];
      });

      // Clear typing indicator for sender
      setTypingUser(null);

      if (onMessageReceived) {
        onMessageReceived(incomingMsg, threadId);
      }
    };

    // Listen for typing indicators
    const handleUserTyping = (data: { threadId: string; userName: string; isTyping: boolean }) => {
      if (data.threadId !== canonicalRoom) return;
      if (data.userName === currentUser.name) return;

      if (data.isTyping) {
        setTypingUser(data.userName);
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
          setTypingUser(null);
        }, 3000);
      } else {
        setTypingUser(null);
      }
    };

    socket.on("new_message", handleNewMessage);
    socket.on("user_typing", handleUserTyping);

    return () => {
      socket.emit("leave_thread", { threadId: canonicalRoom });
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("new_message", handleNewMessage);
      socket.off("user_typing", handleUserTyping);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [threadId, currentUser.name, currentUser.role, currentUser.email, onMessageReceived]);

  // Send message
  const sendMessage = useCallback(
    (text: string, attachmentName?: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const canonicalRoom = resolveCanonicalRoomId(threadId);
      const socket = getSocket();

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

      const newChatMessage: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        senderName: currentUser.name,
        senderRole: currentUser.role,
        text: trimmed,
        time: timeStr,
        isMe: true,
      };

      // Emit to Socket.IO if connected
      if (socket && socket.connected) {
        socket.emit("send_message", {
          threadId: canonicalRoom,
          senderName: currentUser.name,
          senderRole: currentUser.role,
          senderEmail: currentUser.email,
          text: trimmed,
          time: timeStr,
          attachmentName,
        });
        // Stop typing indicator on send
        socket.emit("typing", {
          threadId: canonicalRoom,
          userName: currentUser.name,
          userRole: currentUser.role,
          isTyping: false,
        });
      } else {
        // Fallback optimistic update if offline
        setMessages((prev) => [...prev, newChatMessage]);
      }

      // Persist to instructorStore if relevant thread
      try {
        if (threadId.startsWith("th-") || threadId === "th-1" || threadId === "th-admin") {
          instructorStore.sendChatMessage(threadId, trimmed, currentUser.name);
        }
      } catch (err) {
        console.warn("Could not save to instructorStore:", err);
      }

      return newChatMessage;
    },
    [threadId, currentUser]
  );

  // Send typing notification
  const sendTyping = useCallback(
    (isTyping: boolean) => {
      const socket = getSocket();
      const canonicalRoom = resolveCanonicalRoomId(threadId);
      if (socket && socket.connected) {
        socket.emit("typing", {
          threadId: canonicalRoom,
          userName: currentUser.name,
          userRole: currentUser.role,
          isTyping,
        });
      }
    },
    [threadId, currentUser]
  );

  return {
    messages,
    setMessages,
    sendMessage,
    sendTyping,
    isConnected,
    typingUser,
  };
}
