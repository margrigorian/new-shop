import { createSlice } from "@reduxjs/toolkit";

const managementSlice = createSlice({
    name: "managedStates", // имя не имеет никакого функционала?
    initialState: {
        token: ""
    },
    reducers: {

    }
})

export default managementSlice.reducer;

export const {} = managementSlice.actions;

export const selectManage = (state) => state.manage; // ключ из стора 