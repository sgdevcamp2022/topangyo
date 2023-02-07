import { configureStore } from '@reduxjs/toolkit'
import user from './slice/userslice';
import modal from './slice/modalslice';
import matching from './slice/matchingslice';

export default configureStore({
  reducer: {
    user : user.reducer,
    modal : modal.reducer,
    matching : matching.reducer,
  }
})

