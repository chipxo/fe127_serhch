import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  alreadyRegistered: boolean;
  signedIn: boolean;
  showForm: boolean;
};

const signedIn = localStorage.getItem("signedIn") === "true" || false;

const initialState: InitialState = {
  alreadyRegistered: false,
  signedIn: signedIn,
  showForm: false,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    switchForm: (state) => {
      state.alreadyRegistered = !state.alreadyRegistered;
    },
    setSignedIn: (state, action) => {
      state.signedIn = action.payload;
    },
    showForm: (state) => {
      state.showForm = !state.showForm;
    },
  },
});

export const { switchForm, setSignedIn, showForm } = registerSlice.actions;

export default registerSlice.reducer;
