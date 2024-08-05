import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  data: null,
  quantity: 0,
}

export const bookDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    detailQuantityChange: (state, actions) => {
        state.quantity > 0 ? state.quantity = actions.payload : state.quantity = actions.payload;
    }
  },

})

export const {detailQuantityChange} = bookDetailSlice.actions

export default bookDetailSlice.reducer