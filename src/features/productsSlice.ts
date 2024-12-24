import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { productsApi } from "../api/productsApi";
import { Category, Product } from "../types/types";

interface ProductState {
  filter: Category;
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
}

const initialState: ProductState = {
  filter: { category: "", search: "" },
  products: [],
  filteredProducts: [],
  loading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    handleFilter: (state, action: PayloadAction<Category>) => {
      state.filter = action.payload;
      state.filteredProducts = state.products.filter((product) => {
        const matchesCategory =
          action.payload.category && action.payload.category !== "all"
            ? product.category === action.payload.category
            : true;
        const matchesSearch = action.payload.search
          ? product.title
              .toLowerCase()
              .includes(action.payload.search.toLowerCase())
          : true;
        return matchesCategory && matchesSearch;
      });
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    handleFilterStart: (state) => {
      state.loading = true;
    },

    handleFilterSuccess: (state) => {
      state.loading = false;
    },

    updateProductStock: (
      state,
      action: PayloadAction<{ id: number; stockAvailable: number }>
    ) => {
      const product = state.filteredProducts.find(
        (p) => p.id === action.payload.id
      );
      if (product) {
        product.stockAvailable = action.payload.stockAvailable;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productsApi.endpoints.getProducts.matchFulfilled,
      (state, action) => {
        if (Array.isArray(action.payload)) {
          state.products = action.payload.map((item: Product) => ({
            ...item,
            stockAvailable: Math.floor(Math.random() * 20) + 1,
          }));
          state.filteredProducts = state.products.filter((product) => {
            const matchesCategory =
              action.payload.category && action.payload.category !== "all"
                ? product.category === action.payload.category
                : true;
            const matchesSearch = action.payload.search
              ? product.title
                  .toLowerCase()
                  .includes(action.payload.search.toLowerCase())
              : true;
            return matchesCategory && matchesSearch;
          });
          state.filteredProducts = state.products;
        } else {
          state.products = [];
          state.filteredProducts = [];
        }
      }
    );
  },
});

export const {
  handleFilter,
  setLoading,
  handleFilterStart,
  handleFilterSuccess,
  updateProductStock,
} = productsSlice.actions;

export default productsSlice.reducer;
