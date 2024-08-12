import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import LinkBtn from '../../ui/LinkBtn';
import CartItem from './CartItem';

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = fakeCart;

  return (
    <div className="mx-5 py-4">
      <Link
        to="/menu"
        className="text-blue-500 hover:text-blue-600 hover:underline sm:text-base"
      >
        &larr; Back to menu
      </Link>

      <h2 className="my-4 text-xl font-semibold">Your cart, %NAME%</h2>
      <ul className="divide-y divide-stone-200 border-b">
        {cart.map((item) => {
          return <CartItem item={item} key={item.key} />;
        })}
      </ul>

      <div className="mt-6 space-x-4">
        <Button to="/order/new">Order pizzas</Button>
        <span>
          <Button type="outlinepr">Clear cart</Button>
        </span>
      </div>
    </div>
  );
}

export default Cart;
