import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/User.slice.js";
import SuggestedUserslice from "./Slices/SuggestedUser.js";
import PostsSlice from "./Slices/PostsSlice.js";

export const store = configureStore({
    reducer: {
        User: UserSlice,
        suggestedUsers: SuggestedUserslice,
        Posts: PostsSlice,
    }
})