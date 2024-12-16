import { emptySplitApi } from "./emptySplitApi";

export const productDetailApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductDetail: builder.query({
      query: (id) => `products/${id}`,
    }),
  }),
});
export const { useGetProductDetailQuery } = productDetailApi;
