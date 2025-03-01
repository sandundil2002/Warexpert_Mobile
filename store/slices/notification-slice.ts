import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.8.143:3000",
    withCredentials: true,
});

export interface Notification {
    id: string;
    message: string;
    type: "info" | "success" | "error";
    timestamp?: string;
}

interface NotificationState {
    notifications: Notification[];
    loading: boolean;
    error: string | null;
}

const initialState: NotificationState = {
    notifications: [],
    loading: false,
    error: null,
};

export const fetchNotifications = createAsyncThunk(
    "notification/fetchNotifications",
    async () => {
        const response = await api.get("/notification/get");
        return response.data;
    }
);

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        removeNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(
                notification => notification.id !== action.payload
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch notifications.";
            })
    },
});

export const { removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;