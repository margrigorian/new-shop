import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ManageType = {
    token: string,
    isActiveLoginDrawer: boolean,
    isActiveBasketDrawer: boolean
}

const initialState: ManageType = {
    token: "",
    isActiveLoginDrawer: false,
    isActiveBasketDrawer: false
}

const managementSlice = createSlice({
    name: "managedStates", // имя не имеет никакого функционала?
    initialState,
    reducers: {
        isOpenLoginDrawer: (state, action: PayloadAction<boolean>) => {           
            state.isActiveLoginDrawer = action.payload; 
        },
        isOpenBasketDrawer: (state, action: PayloadAction<boolean>) => {
            state.isActiveBasketDrawer = action.payload;
        }
    }
})

export default managementSlice.reducer;

export const {isOpenLoginDrawer, isOpenBasketDrawer} = managementSlice.actions;