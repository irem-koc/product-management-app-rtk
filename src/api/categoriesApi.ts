import { apiWithTag } from "./emptySplitApi";

export const categoriesApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "products/categories",
      // @ts-expect-error
      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
