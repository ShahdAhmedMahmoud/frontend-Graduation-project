"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

type NotificationContextType = {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  resetUnread: () => void;
};

const NotificationContext = createContext<NotificationContextType>({
  unreadCount: 0,
  setUnreadCount: () => {},
  resetUnread: () => {},
});

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0);

  const resetUnread = useCallback(() => setUnreadCount(0), []);

  return (
    <NotificationContext.Provider value={{ unreadCount, setUnreadCount, resetUnread }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);