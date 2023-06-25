import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

interface Photos {
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface PhotoState {
  photos: Photos[];
  loading: boolean;
  error?: string | null;
  selectedAlbumId: number;
}

export const fetchPhotos = createAsyncThunk<Photos[], number>(
  'photos/fetchPhotos',
  async () => {
    const response = await axios.get<Photos[]>(
      `https://jsonplaceholder.typicode.com/photos`
    );
    return response.data;
  }
);

const initialState: PhotoState = {
  photos: [],
  loading: false,
  error: null,
  selectedAlbumId: 0,
};

const photoSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setSelectedAlbumId: (state, action: PayloadAction<number>) => {
      state.selectedAlbumId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = action.payload;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const photoAction = photoSlice.actions;
export const photoReducer = photoSlice.reducer;

export const getPhotoState = (rootstate: { photo: PhotoState }) => {
  return rootstate['photo'];
};

export const selectPhotosByAlbumId = createSelector(
  getPhotoState,
  (state) => state.photos
);
export const selectSelectedAlbumId = createSelector(
  getPhotoState,
  (state) => state.selectedAlbumId
);
