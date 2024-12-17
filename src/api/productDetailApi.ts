import { apiWithTag } from "./emptySplitApi";

export const productDetailApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getProductDetail: builder.query({
      query: (id) => `products/${id}`,
      // @ts-expect-error
      providesTags: (id) => ["Product Detail", id],
    }),
  }),
});
export const { useGetProductDetailQuery } = productDetailApi;
