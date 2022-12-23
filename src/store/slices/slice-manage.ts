import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import request from "../request/request";
import { links } from "../request/links";
import { userType } from "../request/request";

type ManageType = {
    token: string,
    isActiveLoginDrawer: boolean,
    isActiveBasketDrawer: boolean,
    isActiveRegistrationForm: boolean,
    loading: boolean,
    error: string | null
}

const initialState: ManageType = {
    token: "",
    isActiveLoginDrawer: false,
    isActiveBasketDrawer: false,
    isActiveRegistrationForm: false,
    loading: false,
    error: null
}


export const requestToken = createAsyncThunk<string, userType, {rejectValue: string}>( // 1 - ожид. результат запроса, 2 - тип передав. параметров через дисп., 3 - типизация ошибки
    'managedStates/requestToken',
    async function(data, {rejectWithValue}) { // метод для обработки ошибок
        try{
            const response = await request("POST", links.tokenLink, data, "token");
            // console.log(response);
            
            // КАК ОБРАБОТАТЬ ОШИБКУ?
            // if(!response) { 
            //     rejectWithValue("Server Error"); // исключение, которое прервет обработку
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(requestToken.pending, (state) => { // в ожидании
                state.loading = true;
                state.error = null;
            })
            .addCase(requestToken.fulfilled, (state, action) => { // выполненный
                if(action.payload) { // так не делается, но чтобы у меня правильно тракотовалось отсутсвие токена
                    state.token = action.payload;
                    state.loading = false;
                    state.isActiveRegistrationForm = false;
                    state.isActiveLoginDrawer = false; // при catch тоже падаем сюда, т.к. requestToken.rejected не прописан
                }else {
                    state.loading = false;
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

export const {isOpenLoginDrawer, isOpenBasketDrawer, isOpenRegistationForm} = managementSlice.actions;