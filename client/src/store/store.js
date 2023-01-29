import { configureStore, createSlice } from '@reduxjs/toolkit'

const user = createSlice({
    name : 'user',
    initialState : {
        id : "",
        nickname : "",
        gender : 1,
        accessToken : "",
    },
    reducers : {
      changeToken(state, token) {
        state.accessToken = token.payload;
      },
      changeId(state, id) {
        state.id = id.payload;
      },
      changeNickname(state, nickname) {
        state.nickname = nickname.payload;
      },
      changeGender(state, gender) {
        state.gender = gender.payload;
      }
    }
})



export default configureStore({
  reducer: {
    user : user.reducer
  }
})

export const { changeToken, changeId, changeNickname, changeGender } = user.actions