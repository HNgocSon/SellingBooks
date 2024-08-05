import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './reducers/cartSlice';
import authReducer from './reducers/authSlice';
import addressReducer from './reducers/addressSlice';
import customerReducer from './reducers/customerSlice';
import orderReducer from './reducers/orderSlice';
import wishListReducer from './reducers/wishListSlice';
import viewedBooksReducer  from './reducers/viewedBooksSlice';

//Thư viện redux-persist giúp quản lý và lưu trữ trạng thái của redux
//Khi load trang sẽ không bị mất dữ liệu trong reducer 
//và đồng thời tự động lưu dữ liệu đó trong localStorage

//Cấu hình Redux Persist
const persistConfig = {
  key: 'root',        //Xác định key được sử dụng để lưu trữ trạng thái trong LocalStorage.
  storage,            //Xác định cơ sở dữ liệu sử dụng để lưu trữ trạng thái ở đây là LocalStorage
  whitelist: ['cart', 'auth', 'address', 'customer', 'orders', 'wishList', 'viewedBooks'] //Xác định danh sách các reducer mà bạn muốn lưu trữ.
};
//Kết hợp các reducers khác lại với nhau thông qua hàm combineReducers của redux/toolkit
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  address: addressReducer,
  customer: customerReducer,
  orders: orderReducer,
  wishList: wishListReducer,
  viewedBooks: viewedBooksReducer
});

//persistedReducer Đây là một reducer mở rộng để tự động xử lý quá trình lưu và khôi phục trạng thái.
//Truyền cấu hình persistConfig và danh sách rootReducer các reducers đã được combine 
//để bắt đầu tiến trình lưu trữ, khôi phục tự động 
const persistedReducer = persistReducer(persistConfig, rootReducer); 

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store);



