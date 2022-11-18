import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
    name: "basket",
    initialState: [],
    reducers: {

    }
})

export default basketSlice.reducer;

export const {} = basketSlice.actions;

export const selectBasket = (state) => state.basket;

