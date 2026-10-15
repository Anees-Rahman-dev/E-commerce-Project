import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
getAllProducts,
createProduct,
removeProduct,
updateProduct,
updateProductStock,
} from '../../services/productService';
import { Key } from 'lucide-react';

export const fetchProducts = createAsyncThunk(
'products/fetchAll',
async () => {
return await getAllProducts();
}
);

export const fetchLimitedProducts = createAsyncThunk(
'products/fetchLimited',
async () => {
// Fetch products from the ASP.NET backend.
// Pagination can be added after confirming backend support.
return await getAllProducts();
}
);

export const addProduct = createAsyncThunk(
'products/addProduct',
async (product) => {
return await createProduct(product);
}
);

export const editProduct = createAsyncThunk(
'products/editProduct',
async ({ id, form }) => {
await updateProduct(id, form);
return {
  id : Number(id),
  form : {
    Name : form.get('Name'),
    Category : form.get('Category'),
    Price : form.get('Price'),
    Stock : form.get('Stock'),
    Description: form.get('Description'),
    Rating: form.get('Rating'),
    Image: form.get('Image'),
  }//This sends the actual FormData object to updateProduct()-
  //and separately creates a plain object for updating-
  // //Redux state after the backend responds.
};
}
);

export const updateStock = createAsyncThunk(
  'products/updateStock',
  async ({ id, data }) => {
    await updateProductStock(id, data);
    return { id, ...data };
  }
);

export const deleteProduct = createAsyncThunk(
'products/deleteProduct',
async (id) => {
await removeProduct(id);
return id;
}
);

const productSlice = createSlice({
name: 'products',

initialState: {
items: [],
status: 'idle',
error: null,
pages: 1,
currentPage: 1,
},

reducers: {},

extraReducers: (builder) => {
builder
.addCase(fetchProducts.pending, (state) => {
state.status = 'loading';
state.error = null;
})
.addCase(fetchProducts.fulfilled, (state, action) => {
state.status = 'succeeded';
state.items = action.payload;
})
.addCase(fetchProducts.rejected, (state, action) => {
state.status = 'failed';
state.error = action.error.message;
})


  .addCase(fetchLimitedProducts.pending, (state) => {
    state.status = 'loading';
    state.error = null;
  })
  .addCase(fetchLimitedProducts.fulfilled, (state, action) => {
    state.status = 'succeeded';
    state.items = action.payload;
    state.pages = 1;
  })
  .addCase(fetchLimitedProducts.rejected, (state, action) => {
    state.status = 'failed';
    state.error = action.error.message;
  })

  .addCase(addProduct.fulfilled, (state, action) => {
    state.items.push(action.payload);
  })

  .addCase(editProduct.fulfilled, (state, action) => {
    const index = state.items.findIndex(
      (item) => 
        Number(item.productId ?? item.id) === Number(action.payload.id)
    );

    if (index !== -1) {
      const updated = action.payload.form;

      state.items[index] = {
        ...state.items[index],
        name : updated.Name,
        Category : updated.Category,
        price : Number(updated.Price),
        stock: Number(updated.Stock),
        description: updated.Description,
        rating: Number(updated.Rating),
        image: updated.Image || state.items[index].image,
      };
    }
  })

  .addCase(updateStock.fulfilled, (state, action) => {
    const index = state.items.findIndex(
      (item) => (item.productId ?? item.id) === Number(action.meta.arg.id)
    );

    if (index !== -1) {
      state.items[index] = {
        ...state.items[index],
        ...action.payload,
      };
    }
  })

  .addCase(deleteProduct.fulfilled, (state, action) => {
    state.items = state.items.filter(
      (item) => (item.productId ?? item.id) !== Number(action.payload)
    );
  });


},
});

export default productSlice.reducer;
  