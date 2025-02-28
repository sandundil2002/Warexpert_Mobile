import {configureStore} from "@reduxjs/toolkit";
import packageReducer from "./slices/package-slice";
import notificationReducer from "./slices/notification-slice";
import contactReducer from "./slices/contact-slice";

export const store = configureStore({
    reducer: {
        package: packageReducer,
        notification: notificationReducer,
        contact: contactReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;