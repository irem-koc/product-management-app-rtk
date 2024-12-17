import { apiWithTag } from "./emptySplitApi";

export const productsApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
      // @ts-expect-error
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
