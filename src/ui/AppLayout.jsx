import React from 'react';
import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const path = navigation?.location?.pathname;
  console.log(navigation);
  return (
    <div className="grid max-h-[100dvh] h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && path === '/menu' && <Loader />}
      <Header />
      <div>
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}
