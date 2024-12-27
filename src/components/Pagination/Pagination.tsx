import { handleChange } from "../../features/productsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hook";

const Pagination = () => {
  const { filteredProducts, pagination } = useAppSelector(
    (state) => state.products
  );
  const dispatch = useAppDispatch();

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= pagination.total) {
      dispatch(handleChange({ ...pagination, page }));
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={() => handlePageClick(pagination.page - 1)}
        disabled={pagination.page === 1}
        className={`px-4 py-2 rounded-lg border ${
          pagination.page === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-blue-600 hover:bg-blue-100 border-blue-600"
        }`}
      >
        Previous
      </button>
      <span className="px-3 py-1 rounded-md border bg-blue-600 text-white">
        Page {pagination.page} of {pagination.total}
      </span>
      <button
        onClick={() => handlePageClick(pagination.page + 1)}
        disabled={pagination.page === pagination.total}
        className={`px-4 py-2 rounded-lg border ${
          pagination.page === pagination.total
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-blue-600 hover:bg-blue-100 border-blue-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
