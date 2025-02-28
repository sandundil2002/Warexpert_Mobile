import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.8.143:3000",
    withCredentials: true,
});

export const fetchPackageDetails = createAsyncThunk(
    "package/fetchPackageDetails",
    async (trackingId: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`/tracking/get/${trackingId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue("Failed to fetch package details.");
        }
    }
);

interface PackageState {
    packageDetails: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: PackageState = {
    packageDetails: null,
    loading: false,
    error: null,
};

const packageSlice = createSlice({
    name: "package",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPackageDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPackageDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.packageDetails = action.payload;
            })
            .addCase(fetchPackageDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default packageSlice.reducer;