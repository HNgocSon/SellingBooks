import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const viewedBooksSlice = createSlice({
  name: 'viewedBooks',
  initialState,
  reducers: {
    addBookToViewedBook: (state, action) => {
      const newItem = action.payload;
      if (state.items.length === 0) {
        if(newItem.discounts?.[0]?.percent){
          state.items.push(action.payload);
        }else{
          state.items.push(action.payload);
        }
      } else {
        let check = false;
        state.items.map((item, key) => {
          if (state.items[key].id === newItem.id) {
            check = true;
          }
        })
        if (!check) {
          if(newItem.discounts?.[0]?.percent){
            state.items.push(action.payload);
          }else{
            state.items.push(action.payload);
          }
        }
      }
    },
    addComboToViewedBook: (state, action) => {
      const newItem = action.payload;
      if (state.items?.length === 0) {
        state.items?.push(action.payload);
      } else {
        let check = false;
        state.items?.map((item, key) => {
          if (state.items?.[key].comboId === newItem.id) {
            check = true;
          }
        })
        if (!check) {
          state.items?.push(action.payload);
        }
      }
    },
    deleteAllViewedBooks: (state) => {
      state.items = [];
    },
  },
})

export const { addBookToViewedBook, addComboToViewedBook, deleteAllViewedBooks } = viewedBooksSlice.actions

export default viewedBooksSlice.reducer