import { useGetProductsQuery } from "@/api/productsApi";
import Pagination from "@/components/Pagination/Pagination";
import { useNavigate } from "react-router";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useAppSelector } from "../../store/hook";

const ProductList = () => {
  const { data } = useGetProductsQuery();
  const products = useAppSelector((state) => state.products);
  const navigateTo = useNavigate();
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Product List</h1>
        <button
          onClick={() => navigateTo("/products/add")}
          className="px-4 py-2 bg-white text-green-500 border border-green-500 font-semibold rounded-lg shadow-md hover:shadow-2xl hover:shadow-inner hover:bg-green-500 hover:text-white transform hover:scale-105 transition-all duration-300"
        >
          Yeni Ürün Ekle
        </button>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products &&
          products?.products?.map((productItem: Product) => (
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
