import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { productsApi } from "../api/productsApi";
import { Category, Pagination, Product } from "../types/types";

interface ProductState {
  filter: Category;
  products: Product[];
  filteredProducts: Product[];
  pagination: Pagination;
  loading: boolean;
}

const initialState: ProductState = {
  filter: { category: "", search: "" },
  products: [],
  filteredProducts: [],
  loading: false,
  pagination: {
    page: 1,
    total: 0,
    size: 10,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    handleFilter: (state, action: PayloadAction<Category>) => {
      state.filter = action.payload;

      const filtered = state.products.filter((product) => {
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

      state.filteredProducts = filtered;
      state.pagination.total = Math.ceil(
        filtered.length / state.pagination.size
      );

      state.pagination.page = 1;
      const startIndex = (state.pagination.page - 1) * state.pagination.size;
      const endIndex = startIndex + state.pagination.size;
      state.filteredProducts = filtered.slice(startIndex, endIndex);
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

    handleChange: (state, action: PayloadAction<Pagination>) => {
      state.pagination = { ...state.pagination, ...action.payload };
      const startIndex = (state.pagination.page - 1) * state.pagination.size;
      const endIndex = startIndex + state.pagination.size;
      state.filteredProducts = state.products.slice(startIndex, endIndex);
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      console.log(action.payload, " added");
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

          state.pagination.total = Math.ceil(
            state.products.length / state.pagination.size
          );

          state.pagination.page = 1;
          const startIndex =
            (state.pagination.page - 1) * state.pagination.size;
          const endIndex = startIndex + state.pagination.size;
          state.filteredProducts = state.products.slice(startIndex, endIndex);
        } else {
          state.products = [];
          state.filteredProducts = [];
          state.pagination.total = 0;
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
  handleChange,
  addProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
