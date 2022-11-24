import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ManageType = {
    token: string,
    isActiveLoginDrawer: boolean
}

const initialState: ManageType = {
    token: "",
    isActiveLoginDrawer: false
}

const managementSlice = createSlice({
    name: "managedStates", // имя не имеет никакого функционала?
    initialState,
    reducers: {
        isOpenLoginDrawer: (state, action: PayloadAction<boolean>) => { // можно вообще не передавать значение            
            state.isActiveLoginDrawer = action.payload; // или action.payload
        }
    }
})

export default managementSlice.reducer;

export const {isOpenLoginDrawer} = managementSlice.actions;