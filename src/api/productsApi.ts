import { emptySplitApi } from "./emptySplitApi";

export const productsApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
