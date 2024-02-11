import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserData = {
  name: string;
  email: string;
};

type InitialState = {
  alreadyRegistered: boolean;
  signedIn: boolean;
  openForm: boolean;
  openUserPanel: boolean;
  userData: UserData | null;
};

const initialState: InitialState = {
  alreadyRegistered: true,
  signedIn: false,
  openForm: false,
  openUserPanel: false,
  userData: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegistered: (state, action: PayloadAction<boolean>) => {
      state.alreadyRegistered = action.payload;
    },
    setSignedIn: (state, action: PayloadAction<boolean>) => {
      state.signedIn = action.payload;
    },
    showForm: (state, action: PayloadAction<boolean>) => {
      state.openForm = action.payload;
    },
    showUserPanel: (state, action: PayloadAction<boolean>) => {
      state.openUserPanel = action.payload;
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
  },
});

export const {
  setRegistered,
  setSignedIn,
  showForm,
  showUserPanel,
  setUserData,
} = registerSlice.actions;

export default registerSlice.reducer;
