import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  name: string;
  email: string;
  photoURL: string;
  credits: number;
  isCreditAvaliable: boolean;
}

interface UserState {
  userData: User | null;
}

const initialState: UserState = {
  userData: null,
};

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    setUserData: (
      state,
      action: PayloadAction<User>
    ) => {
      state.userData = action.payload;
    },

    clearUserData: (state) => {
      state.userData = null;
    },
     updateCredits:(state,action)=>{
            if(state.userData){
                state.userData.credits = action.payload
            }
        },
  },
});

export const {
  setUserData,
  clearUserData,
  updateCredits
} = userSlice.actions;

export default userSlice.reducer;