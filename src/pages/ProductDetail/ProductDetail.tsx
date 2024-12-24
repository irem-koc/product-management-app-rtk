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
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-start">
          Ürün Detayları
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-72 rounded-lg object-contain bg-gray-100 p-4"
          />

          <div className="col-span-2 flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {product?.title}
            </h2>
            <p className="text-gray-600 text-sm">{product?.description}</p>
            <div>
              <span className="text-lg font-semibold text-blue-600">
                ${product?.price.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Kategori:{" "}
              <span className="font-medium text-gray-700">
                {product?.category}
              </span>
            </p>
            <div className="flex items-center gap-2 text-yellow-500">
              <span>⭐ {product?.rating.rate}</span>
              <span className="text-gray-500">
                ({product?.rating.count} yorum)
              </span>
            </div>
            {/* <p className="text-sm text-gray-500">
              Stok Durumu:{" "}
              <span
                className={`font-medium ${
                  product?.stockAvailable > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {product?.stockAvailable > 0
                  ? `${product.stockAvailable} adet mevcut`
                  : "Stokta yok"}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Favori Durumu:{" "}
              <span
                className={`font-medium ${
                  product?.isFavorite ? "text-green-600" : "text-gray-600"
                }`}
              >
                {product?.isFavorite ? "Favorilere eklenmiş" : "Favoride değil"}
              </span>
            </p> */}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigateTo(`/products/${id}/edit`)}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
          >
            Düzenle
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
