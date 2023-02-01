import { configureStore } from '@reduxjs/toolkit'
import user from './slice/userslice';

export default configureStore({
  reducer: {
    user : user.reducer
  }
})

export const { changeToken, changeId, changeNickname, changeGender, changeLocation } = user.actions