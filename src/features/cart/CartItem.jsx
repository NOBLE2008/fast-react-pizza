import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { decrementCart, incrementCart, removeItem } from './cartSlice';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const dispatch = useDispatch();
  return (
    <li className="flex flex-col gap-2 py-3">
      <p>
        <span className='font-bold'>{quantity}&times;</span> {name}
      </p>
      <div className="flex justify-between">
        <p className="self-end font-bold">{formatCurrency(totalPrice)}</p>
        <div className="flex space-x-2">
          <div className="space-x-2">
            <Button type="roundedsm" onClick={() => {
              dispatch(decrementCart(pizzaId));
            }}>-</Button>
            <span>{quantity}</span>
            <Button type="roundedsm" onClick={() => {
              dispatch(incrementCart(pizzaId));
            }}>+</Button>
          </div>
          <Button
            type="deletesm"
            onClick={() => {
              dispatch(removeItem(pizzaId));
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
