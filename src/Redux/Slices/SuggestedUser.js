import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "http://localhost:3000/api"


const initialState = {
    suggestedUsers: [],
    loading: false,
    error: false,
    message: null
}

export const SuggestedUserslice = createSlice({
    name: "suggestedUsers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userSuggested.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(userSuggested.fulfilled, (state, action) => {
                state.loading = false;
                state.suggestedUsers = action.payload.suggestedUsers;
                state.message = action.payload.message;
            })
            .addCase(userSuggested.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload
                state.error = true
            })
    }
})


export const userSuggested = createAsyncThunk("/user/suggested", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${BASE_URL}/usersuggestion`)
        return res.data
    } catch (error) {
        const { payload } = rejectWithValue(error?.response?.data)
        return payload
    }
})

export default SuggestedUserslice.reducer