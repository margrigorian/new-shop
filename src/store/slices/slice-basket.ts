import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import request from "../request/request";
import { ProductType } from "./slice-manage";
import { links } from "../request/links";

type AuthorType = {
    fullname: string,
}

type CommentType = {
    author: AuthorType,
    body: string
}

export type RequestProductType = {
    id: string,
    title: string,
    description: string,
    price: number,
    count?: number,
    src: string,
    reactions: ReactionType,
    comments: CommentType[] 
  }
  
type ReactionType = {
    likes: string | null,
    dislikes: string | null,
    yourReaction: string | null
}

type SendCommentType = {
    id: string,
    review: string
}

type CountType = {
    id: string,
    count: string
}

type BasketType = {
    products: ProductType[], // массив объектов по типу BasketProductType
    loading: boolean,
    error: string | null
}

const initialState: BasketType = {
    products: [],
    loading: false,
    error: null
}

// type AddType = {
//     id: string,
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


// НЕ СРАБАТЫВЕАТ 
// export const requestAddProductToBasket = createAsyncThunk<any, AddType, {rejectValue: string}>(
//     "basket/requestAddProductToBasket",
//     async function(data, {rejectWithValue}) {
//         console.log(data);
        
//         const response: any = await request("POST", links.addOrRemoveProductLink, {"product_id": data.id}, data.token);
//         console.log(response);
        
//         if(response.status !== 200) {
//             return rejectWithValue("Error");
//         }
        
//         return response;
//     }
// )

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        // Не делаю запрос на сервер по корзине юзера, так как в продуктах не учитывается их добав. количество
        addToBasket: (state, action: PayloadAction<ProductType | RequestProductType>) => {
            const newProduct = state.products.find(item => item.id === action.payload.id);
            // const newProduct = state.basket.products.find(item => item.id === action.payload.id);

            if(newProduct === undefined) {
                // state.products.push({...action.payload, added: 1})
                state.products.push({...action.payload})

                // ЧТОБЫ НЕ ДЕЛАТЬ ЛИШНИХ КЛЮЧЕЙ (added)
                const currentProduct = state.products.find(item => item.id === action.payload.id);
                // СРАЗУ ПОМЕНЯТЬ COUNT В ACTION.PAYLOAD НЕЛЬЗЯ
                if(currentProduct) {
                    currentProduct.count = 1; 
                }
            }
        },
        changeCount: (state, action: PayloadAction<CountType>) => {
            const currentProduct = state.products.find(item => item.id === action.payload.id);
            if(currentProduct) {
                currentProduct.count = +action.payload.count; 
            }
        },
        addCommentToProduct: (state, action: PayloadAction<SendCommentType>) => {
            const comment = {author: {fullname: "Name"}, body: action.payload.review};
            // const comment = JSON.parse(action.payload.review);

            state.products = state.products.map(item => {
                if(item.id === action.payload.id && item.comments === undefined) {
                    return {...item, comments: [comment]};
                }else if(item.id === action.payload.id && item.comments !== undefined) {
                    const comments = [...item.comments, comment];
                    return item = {...item, comments};
                }else {
                    return item;
                }
            })
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(item => item.id !== action.payload);
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(getProductList.pending, (state) => {
    //             state.loading = true;
    //             state.error = null;
    //         })
    //         .addCase(getProductList.fulfilled, (state, action) => {
    //             state.loading = false;
    //             state.products.push(action.payload);
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

export const {
                addToBasket: addProductToLoсalBasket, 
                changeCount: changeProductCountInBasket, 
                addCommentToProduct, 
                removeProduct: removeProductFromBasket} = basketSlice.actions;

