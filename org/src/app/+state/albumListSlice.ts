import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface AlbumState {
  albums: Album[];
  loading: boolean;
  error?: string | null;
  selectedUserId: number;
}

export const fetchAlbums = createAsyncThunk<Album[], number>(
  'albums/fetchAlbums',
  async () => {
    const response = await axios.get<Album[]>(
      `https://jsonplaceholder.typicode.com/albums`
    );
    return response.data;
  }
);

const initialState: AlbumState = {
  albums: [],
  loading: false,
  error: null,
  selectedUserId: 0,
};

export const albumSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setSelectedUserId: (state, action: PayloadAction<number>) => {
      state.selectedUserId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.loading = false;
        state.albums = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const albumReducer = albumSlice.reducer;
export const albumAction = albumSlice.actions;

export const getAlbumState = (rootstate: { album: AlbumState }) => {
  return rootstate['album'];
};

export const selectAlbumsByUserId = createSelector(
  getAlbumState,
  (state) => state.albums
);

export const selectSelectedUserId = createSelector(
  getAlbumState,
  (state) => state.selectedUserId
);
