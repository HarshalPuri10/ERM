import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare({ type = "info", message }) {
        return {
          payload: {
            id: nanoid(),
            type,
            message,
            createdAt: Date.now(),
            read: false,
          },
        };
      },
    },
    removeNotification(state, action) {
      state.items = state.items.filter((n) => n.id !== action.payload);
    },
    markAsRead(state, action) {
      const notif = state.items.find((n) => n.id === action.payload);
      if (notif) notif.read = true;
    },
    clearAll(state) {
      state.items = [];
    },
  },
});

export const {
  addNotification,
  removeNotification,
  markAsRead,
  clearAll,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
