import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className='py-3 flex flex-col gap-2'>
      <p>
        {quantity}&times; {name}
      </p>
      <div className='flex justify-between'>
        <p className='font-bold self-end'>{formatCurrency(totalPrice)}</p>
        <Button type='deletesm'>Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
