import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from './userListSlice';
import { albumReducer } from './albumListSlice';
import { photoReducer } from './photosListSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    album: albumReducer,
    photo: photoReducer,
  },
});

export default store;
