import { Link, useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import LinkBtn from '../../ui/LinkBtn';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { clearCart } from './cartSlice';

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
  const cart = useSelector((state) => {
    return state.cart.cart;
  });
  console.log(cart)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const username = useSelector((state) => state.user.username);
  useEffect(() => {
    if (username === '') navigate('/');
  }, [username, navigate]);
  return (
    <div className="mx-5 h-full py-4">
      <Link
        to="/menu"
        className="text-blue-500 hover:text-blue-600 hover:underline sm:text-base"
      >
        &larr; Back to menu
      </Link>
      {cart.length > 0 && (
        <>
          <h2 className="my-4 text-xl font-semibold">Your cart, {username}</h2>
          <ul className="divide-y divide-stone-200 border-b">
            {cart.map((item) => {
              return <CartItem item={item} key={item.key} />;
            })}
          </ul>

          <div className="mt-6 space-x-4">
            <Button to="/order/new">Order pizzas</Button>
            <span>
              <Button type="outlinepr" onClick={() => {
                dispatch(clearCart())
              }}>Clear cart</Button>
            </span>
          </div>
        </>
      )}
      {!cart.length && (
        <div className='h-full flex flex-col justify-center items-center'>
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-cart-x fill-red-500"
            viewBox="0 0 16 16"
          >
            <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793z" />
            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default Cart;
