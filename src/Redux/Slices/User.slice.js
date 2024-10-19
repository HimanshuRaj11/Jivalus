import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    User: {},
    loading: false,
    error: false,
    message: null
}


export const UserSlice = createSlice({
    initialState,
    name: "User",
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.User = action.payload.user;
                state.message = action.payload.message;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload
                state.error = true
            })
            .addCase(logoutUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload
                state.error = true
            })


    }
})
const base_url = 'http://localhost:3000'

export const fetchUser = createAsyncThunk("/user", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${base_url}/api/user/`, { withCredentials: true })

        return res.data
    } catch (error) {
        const { payload } = rejectWithValue(error?.response?.data)
        return payload
    }
})

export const logoutUser = createAsyncThunk("/user/logout", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${base_url}/api/user/logout/`, { withCredentials: true })
        return res
    } catch (error) {
        return error.message
    }
})



export default UserSlice.reducer;