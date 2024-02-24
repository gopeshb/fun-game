import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
};
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
      
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
        },
          updateUserSuccess: (state, action) => {
            state.currentUser = { ...action.payload };
          },
          deleteUserSuccess: (state) => {
            state.currentUser = null;
          },
         
          signOutUserSuccess: (state) => {
            state.currentUser = null;
          },
          startGame: (state)=>{
            state.currentUser.gameState=null;
          },
          endGame:(state,action)=>{
            state.currentUser.gameState=null;
          }
          
    }
})
export const{signInSuccess,updateUserSuccess,
deleteUserSuccess,signOutUserSuccess,startGame}=userSlice.actions;
export default userSlice.reducer;