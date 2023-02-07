import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id : "",
  nickname : "",
  name : "",
  birth : "",
  gender : 1,
  phoneNumber : "",
  email : "",
  accessToken : "",
  roles : {
    admin : 0,
    guest : 1984,
    user : 2001
  },
  loc : {
    lat : 33.450701,
    lng : 126.570667
  },
  createdAt : "",
  updatedAt : ""
}

const user = createSlice({
    name : 'user',
    initialState,
    reducers : {
      setToken(state, token) {
        state.accessToken = token.payload;
      },
      setUser(state, user) {
        state.gender = user.payload.gender;
        state.nickname = user.payload.nickname;
        state.id = user.payload.id;
        state.name = user.payload.name;
        state.phoneNumber = user.payload.phoneNumber;
        state.birth = user.payload.birth;
        state.email = user.payload.email;
        state.createdAt = user.payload.createdAt;
        state.updatedAt = user.payload.updatedAt;
        state.roles = user.payload.roles;
      },
      setLocation(state, location) {
        state.loc = location.payload;
      }
    }
})

export default user;
export const { setUser, setToken, setLocation } = user.actions