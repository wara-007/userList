import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { userState } from "../types";

type initialStateType = {
  userList: userState[];
};
const userList: userState[] =
  JSON.parse(localStorage.getItem("userData") as string) ?? [];

const initialState: initialStateType = {
  userList,
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addNewuser: (state, action: PayloadAction<userState>) => {
      state.userList?.push(action.payload);
    },
    updateuser: (state, action: PayloadAction<userState>) => {
      const {
        payload: { name, id, email },
      } = action;

      state.userList = state.userList.map((user) =>
        user.id === id ? { ...user, email, name } : user
      );
      localStorage.setItem("userData", JSON.stringify(state.userList));
    },
    deleteuser: (state, action: PayloadAction<{ id: string }>) => {
      const newArr = state.userList.filter(
        (user) => user.id !== action.payload
      );
      localStorage.setItem("userData", JSON.stringify(newArr));
      state.userList = newArr;
    },
  },
});

export const { addNewuser, updateuser, deleteuser } = userSlice.actions;

export const selectuserList = (state: RootState) => state.user.userList;
export default userSlice.reducer;
