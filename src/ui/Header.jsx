import React from 'react';
import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

export default function Header() {
  return (
    <header id='header' className="flex items-center uppercase justify-between border-b border-stone-800 bg-yellow-500 px-4 py-3 sm:px-6">
      <Link to={'/'} className="tracking-widest">
        🍕 Fast React Pizza
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
