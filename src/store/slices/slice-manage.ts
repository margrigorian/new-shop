import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import request from "../request/request";
import { links } from "../request/links";
import { UserType } from "../request/request";

type AuthorType = {
    fullname: string,
}

type CommentType = {
    author: AuthorType,
    body: string
}

export type ProductType = {
    id: string,
    price: number,
    src: string,
    title: string,
    count?: number,
    comments?: CommentType[] 
}

type ManageType = {
    token: string,
    isActiveLoginDrawer: boolean,
    isActiveBasketDrawer: boolean,
    isActiveRegistrationForm: boolean,
    collectionProducts: ProductType[] | null,
    limitedEditionProducts: ProductType[] | null,
    accessoriasProducts: ProductType[] | null,
    searchProduct: ProductType[],
    isActiveBasketNavBar: boolean,
    isActiveMenu: boolean,
    isActiveSearchNavBar: boolean,
    loading: boolean,
    error: string | null
}

const initialState: ManageType = {
    token: "",
    isActiveLoginDrawer: false,
    isActiveBasketDrawer: false,
    isActiveRegistrationForm: false,
    collectionProducts: [],
    limitedEditionProducts: [],
    accessoriasProducts: [],
    searchProduct: [],
    isActiveBasketNavBar: false,
    isActiveMenu: false,
    isActiveSearchNavBar: false,
    loading: false,
    error: null
}


export const requestToken = createAsyncThunk<string, UserType, {rejectValue: string}>( // 1 - ожид. результат запроса, 2 - тип передав. параметров через дисп., 3 - возвр. знач-е при ошибке
    'managedStates/requestToken',
    async function(data, {rejectWithValue}) { // метод для обработки ошибок
        try{
            const response: any = await request("POST", links.tokenLink, data, "token");
            // console.log(response);
            
            // КАК ОБРАБОТАТЬ ОШИБКУ?
            // if(response.status !== 200) { 
            //     rejectWithValue("Error"); // исключение, которое прервет обработку
            // }  

            return response.data.data.token;

        } catch(error) { // здесь ошибка ловится и переходит в экстраредьюсер requestToken.rejected
            console.log(error); 
            // return rejectWithValue(error); //ругается на неизвестный тип error
        }
    }
)

const managementSlice = createSlice({
    name: "managedStates", // имя не имеет никакого функционала?
    initialState,
    reducers: {
        isOpenLoginDrawer: (state, action: PayloadAction<boolean>) => {           
            state.isActiveLoginDrawer = action.payload; 
        },
        isOpenBasketDrawer: (state, action: PayloadAction<boolean>) => {
            state.isActiveBasketDrawer = action.payload;
        },
        isOpenRegistationForm: (state, action: PayloadAction<boolean>) => {
            state.isActiveRegistrationForm = action.payload;
        },
        isOpenMenu: (state, action: PayloadAction<boolean>) => {
            state.isActiveMenu = action.payload;
        },
        isOpenSearchNavBar: (state, action: PayloadAction<boolean>) => {
            state.isActiveSearchNavBar = action.payload;
        },
        getProductsOfCollection: (state, action) => {
            state.collectionProducts = action.payload;
        },
        getProductsOfLimitedEdition: (state, action) => {
            state.limitedEditionProducts = action.payload;
        },
        getProductsOfAccessorias: (state, action) => {
            state.accessoriasProducts = action.payload;
        },
        getProductsOfSearch: (state, action) => {
            state.searchProduct = action.payload;
        },
        isOpenBasketNavBar: (state, action: PayloadAction<boolean>) => {
            state.isActiveBasketNavBar = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(requestToken.pending, (state) => { // в ожидании
                state.loading = true;
                state.error = null;
            })
            .addCase(requestToken.fulfilled, (state, action) => { // выполненный
                if(action.payload) { // так не делается, но чтобы у меня правильно тракотовалось отсутсвие токена
                    state.loading = false;
                    state.token = action.payload;
                    state.isActiveRegistrationForm = false;
                    state.isActiveLoginDrawer = false; // при catch тоже падаем сюда, т.к. requestToken.rejected не прописан
                }else {
                    state.loading = false; // на странице можно отрисовать
                    state.error = 'Wrong data'; // на странице можно будет отрисовать, исп. material UI
                }
            })
            // .addCase(requestToken.rejected, (state, action) => { // либо это (здесь должны обрабатываться ошибки) либо throw выше
            //     state.loading = false;
            //     state.error = action.payload;
            //     // console.log(state.error);
            // })
    }
})

export default managementSlice.reducer;

export const {
                isOpenLoginDrawer, isOpenBasketDrawer, 
                isOpenRegistationForm, isOpenMenu, 
                isOpenSearchNavBar, getProductsOfCollection, 
                getProductsOfLimitedEdition, getProductsOfAccessorias, 
                getProductsOfSearch, isOpenBasketNavBar} = managementSlice.actions;