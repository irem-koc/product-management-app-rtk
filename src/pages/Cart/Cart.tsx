import CartItem from "../../components/CartItem/CartItem";
import { resetCard } from "../../features/cartSlice";
import { updateProductStock } from "../../features/productsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hook";

const Cart: React.FC = () => {
  const { items: carts } = useAppSelector((state) => state.carts);
  const dispatch = useAppDispatch();
  const totalAmount = (carts || []).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const handleResetCart = () => {
    carts.forEach((product) => {
      const updatedStock = product.stockAvailable + product.quantity;
      dispatch(
        updateProductStock({ id: product.id, stockAvailable: updatedStock })
      );
    });
    dispatch(resetCard(carts));
    carts.forEach((product) => {
      const defaultStock = product.stockAvailable || 0;
      dispatch(
        updateProductStock({ id: product.id, stockAvailable: defaultStock })
      );
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Sepetim</h1>
      {carts?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 flex flex-col gap-4">
            {carts.map((cart) => (
              <CartItem key={cart.id} {...cart} />
            ))}
          </div>
          <div className="bg-gray-100 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Hesap Özeti
            </h2>
            <div className="flex flex-col gap-3">
              {carts.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span className="text-gray-600 text-sm">
                    {item.title} (x{item.quantity})
                  </span>
                  <span className="text-gray-800 text-sm font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">
                  Toplam Tutar:
                </span>
                <span className="text-xl font-bold text-blue-600">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
              <button className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300">
                Satın Al
              </button>
              <button
                onClick={handleResetCart}
                className="mt-4 w-full py-2 px-4 border border-red-500 bg-white text-red-500 font-semibold rounded-lg shadow-md hover:bg-red-600 hover:text-white transition-colors duration-300"
              >
                Sepeti Temizle
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center ">
          <iframe
            src="https://giphy.com/embed/P3nySwO6c57mUVoSI8"
            width="480"
            height="480"
            frameBorder="0"
            allowFullScreen
          />
          <p className="text-lg text-gray-500">Sepetiniz boş.</p>
        </div>
      )}
    </div>
  );
};
export default Cart;
