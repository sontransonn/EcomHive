import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/chat/customer",
    withCredentials: true
})

const initialState = {
    my_friends: [],
    fd_messages: [],
    currentFd: "",
    successMessage: "",
    errorMessage: ""
}

export const add_friend = createAsyncThunk(
    'chat/add_friend',
    async (info, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.post('/add-customer-friend', info)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Gửi tin nhắn từ customer đến seller
export const send_message = createAsyncThunk(
    'chat/send_message',
    async (info, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.post('/send-message-from-customer-to-seller', info)

            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        },
        updateMessage: (state, { payload }) => {
            state.fd_messages = [...state.fd_messages, payload]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_friend.fulfilled, (state, { payload }) => {
                state.fd_messages = payload.messages
                state.currentFd = payload.currentFd
                state.my_friends = payload.myFriends
            })
            .addCase(send_message.fulfilled, (state, { payload }) => {
                let tempFriends = state.my_friends
                let index = tempFriends.findIndex(f => f.fdId === payload.message.receverId)
                while (index > 0) {
                    let temp = tempFriends[index]
                    tempFriends[index] = tempFriends[index - 1]
                    tempFriends[index - 1] = temp
                    index--
                }
                state.my_friends = tempFriends
                state.fd_messages = [...state.fd_messages, payload.message]
                state.successMessage = ' message send success'
            })
    }
})

export const {
    messageClear,
    updateMessage
} = chatSlice.actions

export default chatSlice.reducer