import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = 'http://localhost:3000/api'

const initialState = {
    Posts: {},
    loading: false,
    error: false,

}

export const PostsSlice = createSlice({
    initialState,
    name: 'Posts',

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetPosts.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(GetPosts.fulfilled, (state, action) => {
                state.Posts = action.payload.Posts;
                state.loading = false;
            })
            .addCase(GetPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = true

            })
    }
})

export const GetPosts = createAsyncThunk("posts", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${base_url}/post/suggested`)
        return res.data
    } catch (error) {
        const { payload } = rejectWithValue(error?.response?.data)
        return payload
    }
})

export default PostsSlice.reducer;