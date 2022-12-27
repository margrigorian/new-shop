import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import request from "../request/request";

type BasketProductType = {       
    id: string,
    price: number,
    src: string,
    title: string,
}

type BasketType = {
    products: BasketProductType[], // массив объектов по типу BasketProductType
    loading: boolean,
    error: string | null
}

const initialState: BasketType = {
    products: [],
    loading: false,
    error: null
}

// type ProductsRequest = {
//     link: string,
//     token: string
// }

// НЕВЕРНАЯ ИДЕЯ, Т.К. КАЖДЫЙ РАЗ ПРИ ПЕРЕКЛЮЧЕНИИ СТРАНИЦ БУДЕТ ПРОИСХОДИТЬ ЗАПРОС: СНОВА ВРЕМЯ, СНОВА ОТРИСОВКА...
// И НЕ В БАСКЕТЕ ЗДЕСЬ ЭТОГО ДОЛЖНО НАХОДИТСЯ

// export const getProductList = createAsyncThunk<BasketProductType, ProductsRequest, {rejectValue: string}>(
//     "basket/getProductList",
//     async function(data, {rejectWithValue}) {
//         const response = await request("GET", data.link, undefined, data.token);
//         console.log(response);
        
//         if(response.status !== 200) {
//             return rejectWithValue("Error");
//         }

//         return response.data.data.items;
//     }
// )

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(getProductList.pending, (state) => {
    //             state.loading = true;
    //             state.error = null;
    //         })
    //         .addCase(getProductList.fulfilled, (state, action) => {
    //             state.loading = false;
    //             // ИЛИ ЖЕ ОЧИЩАТЬ МАССИВ, ПОТОМ ДОБАВЛЯТЬ, НО ЭТО БУДЕТ ЗАНИМАТЬ ВРЕМЯ...
    //             state.products.push(action.payload); // СРАБАТЫВАЕТ ДВА РАЗА, ЧТО НЕХОРОШО
    //         })
    //         .addMatcher(isError, (state, action: PayloadAction<string>) => { // сопостовим со всеми AsyncThunk в проверке их ошибок
    //             state.error = action.payload;
    //             state.loading = false;
    //         }) 
    // }
})

export default basketSlice.reducer;

// function isError(action: AnyAction) { // функция проверки наличия ошибки в AsyncThunk
//     return action.type.endsWith('rejected'); // проверка (...заканчивается ли словом 'rejected')
// } // тогда результат true либо false

export const {} = basketSlice.actions;

