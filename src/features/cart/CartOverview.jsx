import { Link } from 'react-router-dom';

function CartOverview() {
  return (
    <div className="flex justify-between items-center bg-stone-800 p-4 uppercase sm:p-6 text-sm sm:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to={'/cart'} className="text-stone-200 active:underline active:font-bold">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
