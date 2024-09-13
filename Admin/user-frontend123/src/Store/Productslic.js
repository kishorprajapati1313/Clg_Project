import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const singleproduct = createAsyncThunk('user/singleproduct', async (productid, thunkAPI) => {
    try {
        const res = await axios.get(`http://localhost:1415/product/${productid}`);
        const product = res.data 
        // console.log(product)
        // Inside singleproductmodel async thunk
        return  product 

    } catch (error) {
        throw error.response.data;
    }
})

// Redux action
export const singleproductmodel = createAsyncThunk('user/singleproductmodel', async (productid, thunkAPI) => {
    try {
        const model = await axios.get(`http://localhost:1415/productmodel/${productid}`);
        const productmodel = model.data;
        // console.log(productmodel)
        return { model: productmodel };
    } catch (error) {
        throw error.response.data;
    }
});

// export const models = createAsyncThunk('user/model', async (productmode, thunkAPI) => {
//     try {
//         const model = await axios.get(`http://localhost:1415/productmodel/${productmode}`)
//         const productmodel = model.data


//     } catch (error) {
//         throw error.response.data;

//     }
// })

const productslice = createSlice({
    name: "product",
    initialState: {
        loading: false,
        product: null,
        model: null,
        error: null,
    },
    //Product get
    extraReducers: (bulider) => {
        bulider
            .addCase(singleproduct.pending, (state) => {
                state.loading = true;
                state.product = null;
                state.error = null;
            })
            .addCase(singleproduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
                state.error = null;
            })
            .addCase(singleproduct.rejected, (state, action) => {
                state.loading = false;
                state.product = null;
                state.error = action.payload;
            })
            .addCase(singleproductmodel.fulfilled, (state, action) => {
                state.model = action.payload.model;
            })
            .addCase(singleproductmodel.rejected, (state, action) => {
                // Handle the error state if needed
            });
    },
});

export default productslice.reducer;