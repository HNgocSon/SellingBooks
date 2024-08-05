import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const featchCategories= createAsyncThunk("featchCategories",async()=>{
    const response = await fetch("http://127.0.0.1:8000/api/book")
    return response.json();
})
// export const featchCategories=createAsyncThunk('reuducers/categories',()=>{
//     return axios
//     .get('http://127.0.0.1:8000/api/user')
//     .then((response)=>response.data.map((categories)=>categories.id))
// })

// const initialState={
//     loading:false,
//     categories:[],
//     error:''
// }
const categories = createSlice({
    name:"categories",
    initialState:{
        isLoading:false,
        data:null,
        isError:false,
    },
    extraReducers:(builder)=>{
        builder.addCase(featchCategories.pending,(state)=>{
            state.isLoading=true;
        });
        builder.addCase(featchCategories.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data=action.payload;
        });
        builder.addCase(featchCategories.rejected,(state,action)=>{
           console.log("Error",action.payload)
            state.isError=true;
        });
    },
});





export default categories.reducer