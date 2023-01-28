import { configureStore, createSlice } from '@reduxjs/toolkit'

const user = createSlice({
    name : 'user',
    initialState : {
        id : "",
        password : "",
        name : "",
        nickname : "",
        birth : "",
        email : "",
        phoneNumber : "",
        gender : 1,
    }
})



export default configureStore({
  reducer: {
    user : user.reducer
  }
})