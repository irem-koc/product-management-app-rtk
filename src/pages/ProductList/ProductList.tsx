import { useGetProductsQuery } from "@/api/productsApi";
import Pagination from "@/components/Pagination/Pagination";
import { useNavigate } from "react-router";
import NoProductFound from "../../components/NoProductFound/NoProductFound";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useAppSelector } from "../../store/hook";
import { Product } from "../../types/types";

const ProductList = () => {
  const { data, isSuccess } = useGetProductsQuery();
  const { filteredProducts } = useAppSelector((state) => state.products);

  const navigateTo = useNavigate();
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Product List</h1>
        <button
          onClick={() => navigateTo("/products/add")}
          className="px-4 py-2 bg-white text-green-500 border border-green-500 font-semibold rounded-lg shadow-md hover:shadow-2xl hover:shadow-inner hover:bg-green-500 hover:text-white transform hover:scale-105 transition-all duration-300"
        >
          Yeni Ürün Ekle
        </button>
      </div>
      {isSuccess && (
        <>
          {filteredProducts?.length > 0 ? (
            <>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((productItem: Product) => (
                  <li key={productItem.id}>
                    <ProductCard {...productItem} />
                  </li>
                ))}
              </ul>
              <Pagination />
            </>
          ) : (
            <NoProductFound />
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
