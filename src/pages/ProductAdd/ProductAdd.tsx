import React, { useState } from "react";
import { useDispatch } from "react-redux";

type Props = {};

const ProductAdd = (props: Props) => {
  const [product, setProduct] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    stockAvailable: "",
    rating: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      ...product,
      id: Number(product.id),
      price: parseFloat(product.price),
      stockAvailable: Number(product.stockAvailable),
      rating: parseFloat(product.rating),
    };
    // dispatch(addProduct(newProduct)); // Uncomment to dispatch action
  };

  // Handle modal open/close
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Add New Product
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Form Fields in Two Columns */}
        <div>
          <label className="block text-gray-700">ID</label>
          <input
            type="number"
            name="id"
            value={product.id}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Stock Available</label>
          <input
            type="number"
            name="stockAvailable"
            value={product.stockAvailable}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Rating</label>
          <input
            type="number"
            step="0.1"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
          >
            Add Product
          </button>
        </div>

        {/* Preview Button */}
        <div className="col-span-2">
          <button
            type="button"
            onClick={toggleModal}
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            Preview Product
          </button>
        </div>
      </form>

      {/* Product Preview Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Product Preview
            </h3>
            <div className="mb-4">
              <strong>Title:</strong> {product.title || "Not entered"}
            </div>
            <div className="mb-4">
              <strong>Price:</strong> ${product.price || "Not entered"}
            </div>
            <div className="mb-4">
              <strong>Description:</strong>{" "}
              {product.description || "Not entered"}
            </div>
            <div className="mb-4">
              <strong>Category:</strong> {product.category || "Not entered"}
            </div>
            <div className="mb-4">
              <strong>Stock Available:</strong>{" "}
              {product.stockAvailable || "Not entered"}
            </div>
            <div className="mb-4">
              <strong>Rating:</strong> {product.rating || "Not entered"}
            </div>
            {product.image && (
              <div className="mb-4">
                <strong>Image:</strong>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-32 h-32 object-cover mt-2"
                />
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={toggleModal}
                className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAdd;
