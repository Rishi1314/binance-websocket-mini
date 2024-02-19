import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSymbol:"ethusdt",
  price:null,
  reload:false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  
    signIn: (state, action) => {
      state.currentSymbol = action.payload;
    },
    signUpdate:(state,action)=>{
      state.price = action.payload;
    }
   
  },
});

export const {
  
  signIn
 ,signUpdate
} = userSlice.actions;
export default userSlice.reducer;
