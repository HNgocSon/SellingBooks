import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const getOrders = createAsyncThunk('orders/getOrders', async (credentials, { rejectWithValue }) => {
    try {
      const ordersData = await axios.get(`http://127.0.0.1:8000/api/order/${credentials.id}`, {
        headers: {
          'Authorization': 'Bearer ' + credentials.token,
          'Accept': 'application/json',
        }
      });
      return ordersData.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

  export const getOrderDetail = createAsyncThunk('orders/getOrderDetail', async (credentials, { rejectWithValue }) => {
    try {
      const ordersData = await  axios.get(`http://127.0.0.1:8000/api/order/detail/${credentials.orderId}`, {
        headers: {
          'Authorization': `Bearer ${credentials.token}`,
          'Accept': 'application/json',
        }
      });
      return ordersData.data;
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
 
const initialState = {
  orderData: null,
  orderDetail: null
}

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    detailQuantityChange: (state, actions) => {
        state.quantity > 0 ? state.quantity = actions.payload : state.quantity = actions.payload;
    },
    deleteOrders: (state, actions) => {
      state.orderData = null;
  }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getOrders.pending, (state) => {
      state.loading = true;
    })
    .addCase(getOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orderData = action.payload;
    })
    .addCase(getOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'An error occurred during login';
    })
    .addCase(getOrderDetail.pending, (state) => {
      state.loading = true;
    })
    .addCase(getOrderDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.orderDetail = action.payload;
    })
    .addCase(getOrderDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'An error occurred during login';
    })
  },
})

export const {deleteOrders} = orderSlice.actions

export default orderSlice.reducer