import CartContainer from "./components/CartContainer"
import Navbar from "./components/Navbar"
import { useSelector, useDispatch } from 'react-redux'
import { calculateTotal, getCartItems } from './features/cart/cartSlice'
import { useEffect } from "react";
import Modal from "./components/Modal";

function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal)

  useEffect(() => {
    dispatch(calculateTotal())
  }, [cartItems, dispatch])

  useEffect(() => {
    dispatch(getCartItems())
  }, [])

  if(isLoading){
    return(
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    )
  }
  
  return (
    <main>
      { isOpen && <Modal /> } 
      <Navbar />
      <CartContainer />
    </main>
  )
}

export default App
