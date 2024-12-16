import { useIsLoading } from "@/hooks/api";

const Loading = () => {
  const isLoading = useIsLoading();
  return (
    isLoading && (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-gray-300"></div>
      </div>
    )
  );
};

export default Loading;
