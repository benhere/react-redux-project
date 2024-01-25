import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { openModal } from '../modal/modalSlice';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
    cartItems: [],
    amount: 5,
    total: 0,
    isLoading: true,
};

export const getCartItems = createAsyncThunk("cart/getCartItems", async (name, thunkAPI) => {
  try {
    const res = await axios(url);
    // console.log(thunkAPI);
    // console.log(thunkAPI.getState());
    // console.log(name);
    // console.log(res.data);
    // thunkAPI.dispatch(openModal());
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },
        increaseItem: (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id)
            cartItem.amount = cartItem.amount + 1;
        },
        decreaseItem: (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id)
            cartItem.amount = cartItem.amount - 1;
        },
        calculateTotal: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount
                total += Math.round(item.amount * item.price);
            })
            state.amount = amount;
            state.total = total;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getCartItems.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getCartItems.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.isLoading = false;
            state.cartItems = action.payload;
        })
        .addCase(getCartItems.rejected, (state, action) => {
            console.log(action);
            state.isLoading = false;
        });
    }
})

// console.log(cartSlice);

export const { clearCart, removeItem, increaseItem, decreaseItem, calculateTotal } = cartSlice.actions;

export default cartSlice.reducer;