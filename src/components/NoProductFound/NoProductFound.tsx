const NoProductFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <iframe
        src="https://giphy.com/embed/6a67zVJ0wMMOzg3YKA"
        width="480"
        height="480"
        className="max-w-xs mb-4"
        frameBorder="0"
        allowFullScreen
      />
      <h2 className="text-xl font-semibold text-gray-700">No products found</h2>
      <p className="text-gray-500">
        We couldn't find any products matching your search.
      </p>
    </div>
  );
};

export default NoProductFound;
