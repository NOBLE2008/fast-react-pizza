import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { formatCurrency } from '../utils/helpers';

function CartOverview() {
  const username = useSelector((state) => {
    return state.user.username;
  });

  const { cart } = useSelector((state) => {
    return state.cart;
  });

  const totalProduct = cart.length;
  const productPrice = cart.reduce((prev, cur) => prev + cur.totalPrice, 0);

  const location = useLocation();
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm uppercase sm:p-6 sm:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>
          {totalProduct > 0 ? totalProduct : 'No'}{' '}
          {totalProduct > 1 ? 'Pizzas' : 'Pizza'}
        </span>
        {totalProduct > 0 && (
          <span>{formatCurrency(String(productPrice))}</span>
        )}
      </p>
      {username && (
        <Link
          to={'/cart'}
          className="text-stone-200 active:font-bold active:underline"
        >
          Open cart &rarr;
        </Link>
      )}
      {!username && location.pathname !== '/' && (
        <Link
          to={'/'}
          className="text-stone-200 active:font-bold active:underline"
        >
          Log in &rarr;
        </Link>
      )}
      {!username && location.pathname === '/' && (
        <Link
          to={'/menu'}
          className="text-stone-200 active:font-bold active:underline"
        >
          Menu &rarr;
        </Link>
      )}
    </div>
  );
}

export default CartOverview;
