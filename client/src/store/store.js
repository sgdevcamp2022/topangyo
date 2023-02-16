import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import user from './slice/userslice';
import modal from './slice/modalslice';
import matching from './slice/matchingslice';
import posts from './slice/postsslice';
import map from './slice/mapslice';
import place from './slice/placeslice';

export default configureStore({
  reducer: {
    user : user.reducer,
    modal : modal.reducer,
    matching : matching.reducer,
    posts : posts.reducer,
    map : map.reducer,
    place : place.reducer,
  },
  middleware : getDefaultMiddleware({
    serializableCheck : false,
  })
})

