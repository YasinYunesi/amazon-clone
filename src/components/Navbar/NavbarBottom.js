import { useDispatch } from "react-redux";
import { activate } from "../../features/sidebar";
import Sidebar from "../Sidebar/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";

function NavbarBottom() {
  // LOGIC /////////////////////////
  const dispatch = useDispatch();

  // JSX /////////////////////////
  return (
    <>
      <ul className='flex items-center py-2 bg-amazon_blue text-white text-sm'>
        <li className='navbar_list_item'>
          <button className='font-semibold flex items-center' onClick={() => dispatch(activate())}>
            <MenuIcon className='mr-1' />
            All
          </button>
        </li>
        <li className='navbar_list_item'>Today's Deals</li>
        <li className='navbar_list_item'>Customer Service</li>
        <li className='navbar_list_item hidden md:block'>Registry</li>
        <li className='navbar_list_item hidden md:block'>Gist Cards</li>
        <li className='navbar_list_item hidden md:block'>Sell</li>
      </ul>

      {/* Sidebar */}
      <Sidebar />
    </>
  );
}

export default NavbarBottom;