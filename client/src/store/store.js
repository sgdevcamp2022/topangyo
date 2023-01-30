import { configureStore, createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name : 'user',
  initialState : {
    id : "",
    nickname : "",
    gender : 1,
    accessToken : "",
    location : {
      lat : 33.452613,
      lng : 126.570888
    }
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
    },
    changeLocation(state, location) {
      state.location = location.payload;
    }
  }
})



export default configureStore({
  reducer: {
    user : user.reducer
  }
})

export const { changeToken, changeId, changeNickname, changeGender, changeLocation } = user.actions