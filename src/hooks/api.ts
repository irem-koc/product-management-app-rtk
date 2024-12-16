import { useAppSelector } from "@/store/hook";

export const useIsLoading = () => {
  return useAppSelector((state) => {
    Object.values(state.api.queries).some(
      (query) => query.status === "pending"
    );
  });
};
