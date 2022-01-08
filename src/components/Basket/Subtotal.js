import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { totalPrice, selectItems, clearBasket } from "../../features/basket";
import { addToOrders } from "../../features/orders";
import BtnLoading from "../Loading/BtnLoading";
import uniqid from "uniqid";

function Subtotal() {
  // LOGIC /////////////////////////
  const [loader, setLoader] = useState(false);
  // Router history
  const history = useHistory();
  // Auth0
  const { isAuthenticated } = useAuth0();
  // Redux
  const basketItems = useSelector(selectItems);
  const total = useSelector(totalPrice);
  const dispatch = useDispatch();
  // Creating the full basket
  const today = new Date();
  const date = today.toUTCString();
  const fullBasket = [basketItems, uniqid(), date, total];

  // Add basket items to orders list
  function addToOrderList() {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      // Dispatching basketItems, Random ID, Date
      dispatch(addToOrders(fullBasket));
      // Changing the route to "/success"
      history.push("/success");
      // Clearing basket after checkout
      dispatch(clearBasket());
    }, 2500);
  }

  // JSX /////////////////////////
  return (
    <div className='px-6 md:px-3 xl:px-6 py-3 col-span-6  md:col-span-1 mt-10 md:mt-0 bg-white shadow-lg md:shadow-none'>
      <h1 className='text-lg font-bold'>
        Subtotal <span className='text-xs text-red-500'>({basketItems.length} Items)</span> :
      </h1>
      <h1 className='bg-red-500 text-white mt-5 py-1 text-center rounded mb-2'>${total}</h1>
      <button
        onClick={addToOrderList}
        className={`w-full block text-center py-1 rounded bg-gradient-to-b text-sm transition-all ${
          isAuthenticated
            ? "from-amber-200 to-amber-500 border border-amber-300 hover:opacity-80"
            : "from-slate-300 to-gray-500 border border-gray-300"
        }`}
        disabled={!isAuthenticated}
      >
        {isAuthenticated ? loader ? <BtnLoading /> : "Proceed to checkout" : "Sign in to checkout"}
      </button>
    </div>
  );
}

export default Subtotal;
