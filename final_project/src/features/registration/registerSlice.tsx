import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserData = {
  name: string;
  email: string;
};

type InitialState = {
  alreadyRegistered: boolean;
  signedIn: boolean;
  showForm: boolean;
  showUserPanel: boolean;
  userData: UserData | null;
};

const signedIn = localStorage.getItem("signedIn") === "true" || false;

const initialState: InitialState = {
  alreadyRegistered: true,
  signedIn: signedIn,
  showForm: false,
  showUserPanel: false,
  userData: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    switchForm: (state) => {
      state.alreadyRegistered = !state.alreadyRegistered;
    },
    setSignedIn: (state, action: PayloadAction<boolean>) => {
      state.signedIn = action.payload;
    },
    showForm: (state, action: PayloadAction<boolean>) => {
      state.showForm = action.payload;
    },
    showUserPanel: (state, action: PayloadAction<boolean>) => {
      state.showUserPanel = action.payload;
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
  },
});

export const { switchForm, setSignedIn, showForm, showUserPanel, setUserData } =
  registerSlice.actions;

export default registerSlice.reducer;
