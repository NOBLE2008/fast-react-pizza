import React from 'react';
import Header from './Header';
import CartOverview from './Footer';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import Loader from './Loader';

export default function AppLayout() {
  const navigation = useNavigation();
  const location = useLocation()
  const isLoading = navigation.state === 'loading';
  const path = navigation?.location?.pathname;
  return (
    <div className="grid max-h-[100dvh] h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && path === '/menu' && <Loader />}
      <Header />
      <div>
        {!isLoading && <main className="mx-auto max-w-3xl h-full">
          <Outlet />
        </main>}
      </div>
      {<CartOverview />}
    </div>
  );
}
