import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.237.105:3000",
    withCredentials: true,
});

interface ContactState {
    name: string;
    email: string;
    message: string;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: ContactState = {
    name: "",
    email: "",
    message: "",
    loading: false,
    error: null,
    success: false,
};

export const sendContactMessage = createAsyncThunk<void, { name: string; email: string; message: string }, { rejectValue: string }>(
    "contact/sendContactMessage",
    async (contactData, { rejectWithValue }) => {
        try {
            const response = await api.post("/contact/post", contactData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Email sent:", response.data);
        } catch (error: any) {
            console.error("Error sending email:", error);
            return rejectWithValue(error.response?.data?.message || "Failed to send email");
        }
    }
);

const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        resetContactState: (state) => {
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendContactMessage.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(sendContactMessage.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(sendContactMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;
