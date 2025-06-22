import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Bütün məhsulları gətir
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const res = await axios.get('http://localhost:5000/api/products');
  return res.data;
});

// Tək məhsulu ID ilə gətir
export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
  const res = await axios.get(`http://localhost:5000/api/products/${id}`);
  return res.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    selectedProduct: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Bütün məhsullar
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // Tək məhsul
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
