import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const cartadd = createAsyncThunk("user/cartadd", async ({userid, productid}) => {
    try {
        // console.log(productid)
        const cart = await axios.post("http://localhost:1415/addtocart", { userid, productid })
        return cart.data
    } catch (error) {
        throw error
    }
})

export const cartlist = createAsyncThunk("user/cartlist", async({userid}) => {
    try {
        // console.log(userid)
        const res = await axios.get(`http://localhost:1415/cartlist/${userid}`)
        return res.data
    } catch (error) {
        throw error
    }
})

export const deleteitem = createAsyncThunk("user/deletecart", async ({ userid, productid }) => {
    try {
        // Update the endpoint to include both userid and productid
        const res = await axios.post(`http://localhost:1415/deleteitem/${userid}/${productid}`);
        return res.data;
    } catch (error) {
        throw error;
    }
});


const cartslice = createSlice({
    name: "cart",
    initialState: {
        loading: false,
        cart: null,
        error: null
    },
    extraReducers: (bulider) => {
        bulider
            .addCase(cartadd.pending, (state) => {
                state.loading = true;
            })
            .addCase(cartadd.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(cartadd.rejected, (state, action) => {
                state.loading = false;
                state.cart = null;
                state.error = action.error.message
            })

            //For DISPLAY the cart
            .addCase(cartlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(cartlist.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(cartlist.rejected, (state, action) => {
                state.loading = false;
                state.cart = null;
                state.error = action.error.message
            })

            //For Delete the cart
            .addCase(deleteitem.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteitem.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(deleteitem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default cartslice.reducer;