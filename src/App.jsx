import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './ui/Home';
import './App.css';
import Error from './ui/Error';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as orderAction,
} from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import AppLayout from './ui/AppLayout';
import ProtectedRoute from './ui/ProtectedRoute';

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        {
          path: '/',
          element: <Home />,
          errorElement: <Error />,
        },
        {
          path: '/menu',
          element: <Menu />,
          loader: menuLoader,
          errorElement: <Error />,
        },
        {
          path: '/cart',
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: '/order/new',
          element: (
            <ProtectedRoute>
              <CreateOrder />
            </ProtectedRoute>
          ),
          action: orderAction,
        },
        {
          path: '/order/:orderId',
          element: (
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          ),
          loader: orderLoader,
          errorElement: <Error />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
