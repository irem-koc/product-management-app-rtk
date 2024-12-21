import { useAppSelector } from "@/store/hook";

export const useIsLoading = () => {
  return useAppSelector((state) => {
    const isFetching = Object.values(state.api.queries).some(
      (query) => query?.status === "pending"
    );
    const isMutating = Object.values(state.api.mutations).some(
      (query) => query?.status === "pending"
    );
    return isFetching || isMutating;
  });
};
