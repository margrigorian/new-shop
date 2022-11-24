import { createSlice } from "@reduxjs/toolkit";

type BasketProductType = {

}

type BasketType = {
    products: BasketProductType[] // массив объектов по типу BasketProductType
}

const initialState: BasketType = {
    products: []
}

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {

    }
})

export default basketSlice.reducer;

export const {} = basketSlice.actions;

