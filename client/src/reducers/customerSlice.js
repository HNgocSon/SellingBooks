import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  customerData: null,
  loading: false ,
  error: null,
  message: null,
  registerSuccess: false,
  registerErrors: null
}

export const getCustomerData = createAsyncThunk('customer/getCustomerData', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/me`, {
      headers: {
        'Authorization': `Bearer ${credentials}`,
        'Accept': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const handleRegister = createAsyncThunk('customer/handleRegister', async (credentials, { rejectWithValue }) => {
  try {
    let response = await axios.post('http://localhost:8000/api/customer/register',  credentials , { 'Content-Type': 'application/json' });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.errors);
  }
});

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customerData = action.payload;
    },
    deleteCustomer: (state) => {
      state.customerData = null;
    },
    setRegisterErrors: (state) => {
      state.registerErrors = false;
    },
    setRegisterSuccess: (state) => {
      state.registerSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getCustomerData.pending, (state) => {
      state.loading = true;
    })
    .addCase(getCustomerData.fulfilled, (state, action) => {
      state.loading = false;
      state.customerData = action.payload;
    })
    .addCase(getCustomerData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'An error occurred during login';
    })
    .addCase(handleRegister.pending, (state) => {
      state.loading = true;
    })
    .addCase(handleRegister.fulfilled, (state, action) => {
      state.loading = false;
      if(action.payload.success){
        state.message = action.payload.message
        state.registerSuccess = true;
      } else{
        state.registerErrors = true
      }
    })
    .addCase(handleRegister.rejected, (state, action) => {
      state.loading = false;
      state.registerErrors = action.payload || true;
    })
  },
})

export const {setCustomer, deleteCustomer, setRegisterErrors, setRegisterSuccess} = customerSlice.actions

export default customerSlice.reducer