import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  userData: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
}

export const loginHandler = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/login`, credentials, {'Accept': 'application/json'});
    const { access_token } = response.data;
    const userDataResponse = await axios.get(`http://127.0.0.1:8000/api/me`, {
      headers: {
        'Authorization': 'Bearer ' + access_token,
        'Accept': 'application/json',
      }
    });
    const userData = userDataResponse.data;
    return { access_token, userData };
   
  } catch (error) {
    return rejectWithValue(error.response.data.errors);
  }
});

export const logoutHandler = createAsyncThunk('auth/logoutHandler', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/logout`, {
      headers: {
        'Authorization': `Bearer ${credentials}` ,
        'Accept': 'application/json',
      }
    });
    return response;
   
  } catch (error) {
    return rejectWithValue(error.response.data.errors);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setError: (state) => {
      state.error = false;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginHandler.pending, (state) => {
      state.loading = false;
    })
    .addCase(loginHandler.fulfilled, (state, action) => {
      state.token = action.payload.access_token;
      state.userData = action.payload.userData;
      state.isLoggedIn = true;
    })
    .addCase(loginHandler.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || true;
    })
    .addCase(logoutHandler.pending, (state) => {
      state.loading = false;
    })
    .addCase(logoutHandler.fulfilled, (state, action) => {
      state.token = null;
      state.isLoggedIn = false;
    })
    .addCase(logoutHandler.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || true;
    })
  },
})

export const {setUser, setToken, setLoading, setError, logout} = authSlice.actions

export default authSlice.reducer