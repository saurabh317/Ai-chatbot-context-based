"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { setUser } from "@/store/userSlice";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Load user from localStorage on app initialization
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        store.dispatch(setUser(user));
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }

    // Subscribe to store changes to sync with localStorage
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      if (state.user.user) {
        localStorage.setItem("user", JSON.stringify(state.user.user));
      } else {
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
