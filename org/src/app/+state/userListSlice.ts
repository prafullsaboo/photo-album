import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  username: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error?: string | null;
}

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const response = await axios.get<User[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
    return response.data;
  }
);

// It define the initial state of store
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// Create the user slice 
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const userReducer = userSlice.reducer;

export const getUserState = (rootstate: { user: UserState }) => {
  return rootstate['user'];
};

export const selectUsers = createSelector(getUserState, (state) => state.users);
