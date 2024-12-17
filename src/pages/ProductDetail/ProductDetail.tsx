import { useGetProductDetailQuery } from "@/api/productDetailApi";
import React from "react";
import { useNavigate, useParams } from "react-router";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigateTo = useNavigate();
  const { data: product } = useGetProductDetailQuery(id);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Bu ürünü silmek istediğinize emin misiniz?"
    );
    if (confirmed) {
      alert("Ürün başarıyla silindi.");
      navigateTo("/products");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 relative">
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full md:w-1/3 rounded-lg object-contain"
          />
          <div className="flex flex-col flex-grow">
            <h1 className="text-2xl font-bold text-gray-800">
              {product?.title}
            </h1>
            <p className="text-gray-600 text-sm mt-2">{product?.description}</p>
            <p className="text-lg font-semibold text-blue-600 mt-4">
              ${product?.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Kategori: {product?.category}
            </p>
            <div className="flex items-center gap-1 text-yellow-500 mt-2">
              <span>⭐ {product?.rating.rate}</span>
              <span className="text-gray-500">
                ({product?.rating.count} yorum)
              </span>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => navigateTo(`/products/${id}/edit`)}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
              >
                Düzenle
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
