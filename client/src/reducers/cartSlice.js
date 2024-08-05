import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  carts: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action) => {
      const newItem = action.payload;
      if (state.carts.length === 0) {
        if (newItem.discounts?.[0]?.percent) {
          state.carts.push({
            id: newItem.id,
            name: newItem.name,
            quantity: 1,
            unit_price: newItem.unit_price - (newItem.unit_price * newItem.discounts[0]?.percent) / 100,
            image: newItem.images?.[0]?.front_cover,
            isCombo: false
          });
        } else {
          state.carts.push({
            id: newItem.id,
            name: newItem.name,
            quantity: 1,
            unit_price: newItem.unit_price,
            image: newItem.images?.[0]?.front_cover,
            isCombo: false
          });
        }
      } else {
        let check = false;
        state.carts.map((item, key) => {
          if (state.carts[key].id === newItem.id) {
            state.carts[key].quantity++;
            check = true;
          }
        })
        if (!check) {
          if (newItem.discounts?.[0]?.percent) {
            state.carts.push({
              id: newItem.id,
              name: newItem.name,
              quantity: 1,
              unit_price: newItem.unit_price - (newItem.unit_price * newItem.discounts[0]?.percent) / 100,
              image: newItem.images?.[0]?.front_cover,
              isCombo: false
            });
          } else {
            state.carts.push({
              id: newItem.id,
              name: newItem.name,
              quantity: 1,
              unit_price: newItem.unit_price,
              image: newItem.images?.[0]?.front_cover,
              isCombo: false
            });
          }
        }
      }
    },
    addCombo: (state, action) => {
      const newItem = action.payload;
      if (state.carts.length === 0) {
        state.carts.push({
          comboId: newItem.id,
          name: newItem.name,
          quantity: 1,
          unit_price: newItem.price,
          image: newItem.image,
          isCombo: true
        });
      } else {
        let check = false;
        state.carts.map((item, key) => {
          if (state.carts[key].comboId === newItem.id) {
            state.carts[key].quantity++;
            check = true;
          }
        })
        if (!check) {
          state.carts.push({
            comboId: newItem.id,
            name: newItem.name,
            quantity: 1,
            unit_price: newItem.price,
            image: newItem.image,
            isCombo: true
          });
        }
      }
    },
    quantityChange: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.carts.findIndex(item => item.id === id);
      if (item !== -1) {
        quantity > 0 ? state.carts[item].quantity = quantity : state.carts[item].quantity = 1;
      }
    },
    deleteCart: (state, action) => {
      state.carts = state.carts.filter(item => item.id !== action.payload);
    },
    deleteAll: (state) => {
      state.carts = [];
    },
  },
})

export const { add, addCombo, quantityChange, deleteCart, deleteAll } = cartSlice.actions

export default cartSlice.reducer