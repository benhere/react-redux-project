/* eslint-disable react/prop-types */
import { ChevronDown, ChevronUp } from "../CartIcons";
import { useDispatch } from "react-redux";
import {
  removeItem,
  increaseItem,
  decreaseItem,
} from "../features/cart/cartSlice";

const CartItem = ({ id, title, price, img, amount }) => {
  const dispatch = useDispatch();
  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        {/* remove button */}
        <button className="remove-btn" onClick={() => dispatch(removeItem(id))}>
          remove
        </button>
      </div>
      <div>
        <button
          className="amount-btn"
          onClick={() => {
            dispatch(increaseItem({ id }));
          }}
        >
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button
          className="amount-btn"
          onClick={() => {
            if (amount === 1) {
                dispatch(removeItem(id));
                return;
            }
            dispatch(decreaseItem({ id }))
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
