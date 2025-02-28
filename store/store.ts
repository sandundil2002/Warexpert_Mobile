import {configureStore} from "@reduxjs/toolkit";
import packageReducer from "./slices/package-slice";

export const store = configureStore({
    reducer: {
        package: packageReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;