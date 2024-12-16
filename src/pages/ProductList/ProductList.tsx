import { useGetProductsQuery } from "@/api/productsApi";
import Pagination from "@/components/Pagination/Pagination";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Product } from "@/types/types";

const ProductList = () => {
  const { data: products, error } = useGetProductsQuery();

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-red-600">
          Error: {error.message}
        </p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-600">
          No products available.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Product List
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((productItem: Product) => (
          <li key={productItem.id}>
            <ProductCard {...productItem} />
          </li>
        ))}
      </ul>
      <Pagination />
    </div>
  );
};

export default ProductList;
