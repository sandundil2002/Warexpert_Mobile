import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.8.143:3000",
    withCredentials: true,
});

export const CATEGORY_PRICES: { [key: string]: number } = {
    Electronics: 200,
    Clothing: 100,
    Food: 50,
    Furniture: 250,
    Other: 100,
};

interface InventoryItem {
    inventoryItemId: string;
    quantity: number;
}

interface Payment {
    id: string;
    amount: number;
    status: string;
    customerId: string;
}

export const createPaymentIntent = createAsyncThunk(
    "payment/createPaymentIntent",
    async ({customerId, inventoryItems, totalAmount,}: { customerId: string; inventoryItems: InventoryItem[]; totalAmount: number }, { rejectWithValue }) => {
        try {
            const response = await api.post("pay/create-payment", {
                customerId,
                inventoryItems,
                totalAmount,
            });

            if (!response.data || !response.data.id) {
                throw new Error("Invalid response from server");
            }

            return response.data as Payment;
        } catch (error: any) {
            console.error("Payment intent error:", error);
            return rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                "Failed to create payment intent"
            );
        }
    }
);

interface PaymentState {
    payment: Payment | null;
    loading: boolean;
    error: string | null;
    paymentComplete: boolean;
}

const initialState: PaymentState = {
    payment: null,
    loading: false,
    error: null,
    paymentComplete: false,
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setPaymentComplete: (state, action: PayloadAction<boolean>) => {
            state.paymentComplete = action.payload;
        },
        resetPaymentState: (state) => {
            state.payment = null;
            state.error = null;
            state.loading = false;
            state.paymentComplete = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPaymentIntent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPaymentIntent.fulfilled, (state, action) => {
                state.loading = false;
                state.payment = action.payload;
                state.error = null;
            })
            .addCase(createPaymentIntent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to create payment intent";
            });
    },
});

export const { setPaymentComplete, resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;