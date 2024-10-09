import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/User.slice.js";

export const store = configureStore({
    reducer: {
        User: UserSlice
    }
})