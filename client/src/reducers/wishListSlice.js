import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  wishListItem: [],
}

export const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const newItem = action.payload;
      if (state.wishListItem.length === 0) {
        if(newItem.discounts?.[0]?.percent){
          state.wishListItem.push(action.payload);
        }else{
          state.wishListItem.push(action.payload);
        }
      } else {
        let check = false;
        state.wishListItem.map((item, key) => {
          if (state.wishListItem[key].id === newItem.id) {
            check = true;
          }
        })
        if (!check) {
          if(newItem.discounts?.[0]?.percent){
            state.wishListItem.push(action.payload);
          }else{
            state.wishListItem.push(action.payload);
          }
        }
      }
    },
    addComboToWishList: (state, action) => {
      const newItem = action.payload;
      if (state.wishListItem.length === 0) {
        state.wishListItem.push(action.payload);
      } else {
        let check = false;
        state.wishListItem.map((item, key) => {
          if (state.wishListItem[key].comboId === newItem.id) {
            check = true;
          }
        })
        if (!check) {
          state.wishListItem.push(action.payload);
        }
      }
    },
    quantityChange: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.wishListItem.findIndex(item => item.id === id);
      if (item !== -1) {
        quantity > 0 ? state.wishListItem[item].quantity = quantity : state.wishListItem[item].quantity = 1;
      }
    },
    deleteWishList: (state, action) => {
      state.wishListItem = state.wishListItem.filter(item => item.id !== action.payload);
    },
    deleteAllWishList: (state) => {
      state.wishListItem = [];
    },
  },
})

export const { addToWishList, addComboToWishList, quantityChange, deleteWishList, deleteAllWishList } = wishListSlice.actions

export default wishListSlice.reducer