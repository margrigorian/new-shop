import { createSlice } from "@reduxjs/toolkit";

const managementSlice = createSlice({
    name: "managedStates",
    initialState: {
        token: ""
    },
    reducers: {

    }
})

export default managementSlice.reducer;

export const {} = managementSlice.actions;

export const selectManage = (state) => state.managedStates;