import { useState } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { Link } from "react-router";
import { useGetCategoriesQuery } from "../../api/categoriesApi";
import { handleFilter } from "../../features/productsSlice";
import { useAppDispatch } from "../../store/hook";

const Header = () => {
  const [filter, setFilter] = useState({
    search: "",
    category: "",
  });
  const dispatch = useAppDispatch();
  const { data: categories } = useGetCategoriesQuery();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevState) => {
      const updatedFilter = { ...prevState, [name]: value };
      setTimeout(() => {
        dispatch(handleFilter(updatedFilter));
      }, 2000);
      return updatedFilter;
    });
  };

  return (
    <header className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap">
        <Link to={"/"} className="flex items-center mb-4 sm:mb-0">
          <h1 className="text-white text-3xl font-bold flex items-center">
            <img
              src="/image.webp"
              alt="Description"
              className="w-10 h-10 mr-2 rounded-full object-cover"
            />
            <span>Product Manager</span>
          </h1>
        </Link>

        <div className="w-full sm:w-2/5 ml-4 mb-4 sm:mb-0">
          <input
            name="search"
            type="search"
            value={filter.search}
            onChange={handleFilterChange}
            placeholder="Search products..."
            className="w-full p-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="w-full sm:w-auto ml-4 mb-4 sm:mb-0">
          <select
            name="category"
            onChange={handleFilterChange}
            value={filter.category}
            className="bg-gray-100 p-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
          >
            <option value={"all"}>All Products</option>
            {categories &&
              categories.map((category: string) => {
                return (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() +
                      String(category).slice(1)}
                  </option>
                );
              })}
          </select>
        </div>

        <Link
          to="/cart"
          className="relative flex items-center text-white ml-4 hover:text-indigo-500"
        >
          <GiShoppingCart className="w-12 h-8" />
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
