// Test ID: IIDSAT

import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { getOrder, updateOrder } from '../../services/apiRestaurant';
import { useEffect, useState } from 'react';
import Loader from '../../ui/Loader';
import OrderItem from './OrderItem';
import { useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { updateUser } from '../user/userSlice';

const order = {
  id: 'ABCDEF',
  customer: 'Jonas',
  phone: '123456789',
  address: 'Arroios, Lisbon , Portugal',
  priority: true,
  estimatedDelivery: '2027-04-25T10:00:00',
  cart: [
    {
      pizzaId: 7,
      name: 'Napoli',
      quantity: 3,
      unitPrice: 16,
      totalPrice: 48,
    },
    {
      pizzaId: 5,
      name: 'Diavola',
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
    {
      pizzaId: 3,
      name: 'Romana',
      quantity: 1,
      unitPrice: 15,
      totalPrice: 15,
    },
  ],
  position: '-9.000,38.000',
  orderPrice: 95,
  priorityPrice: 19,
};

function Order() {
  const navigation = useNavigation();
  const [fetched, setFetched] = useState(0);
  const fetcher = useFetcher();
  const update = useFetcher();
  const order = useLoaderData();
  const isLoading = navigation.state === 'loading';

  useEffect(() => {
    if (!fetcher?.data && fetched === 0) {
      setFetched((f) => {
        return f + 1;
      });
      fetcher.load('/menu');
    }
  }, [fetcher, fetched]);

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery } =
    order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <div className="flex flex-wrap justify-between gap-3">
            <h2 className="font-bold">Order #{id} Status</h2>

            <div className="space-x-4">
              {priority && (
                <span className="rounded-full bg-red-600 px-2 py-1 uppercase text-stone-50">
                  Priority
                </span>
              )}
              <span className="rounded-full bg-green-600 px-2 py-1 uppercase text-stone-800">
                <span className="mr-2">{status} order</span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-between bg-stone-300 px-2 py-3 sm:py-5">
            <p>
              {deliveryIn >= 0
                ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
                : 'Order should have arrived'}
            </p>
            <p className="text-xs italic sm:text-sm">
              (Estimated delivery: {formatDate(estimatedDelivery)})
            </p>
          </div>

          <ul className="divide-y-2">
            {order.cart.map((item, i) => {
              return (
                <OrderItem
                  item={item}
                  key={i}
                  ingredients={
                    fetcher.data?.find((pizza) => {
                      return pizza.id === item.pizzaId;
                    }).ingredients
                  }
                  isLoadingIngredients={fetcher?.data ? false : true}
                />
              );
            })}
          </ul>

          <div className="wrap flex justify-between space-y-1 bg-stone-300 px-3 py-4 sm:space-y-2 sm:py-6">
            <div>
              <p>Price pizza: {formatCurrency(orderPrice)}</p>
              {priority && (
                <p>Price priority: {formatCurrency(priorityPrice)}</p>
              )}
              <p className="font-bold">
                To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
              </p>
            </div>
            {!priority && (
              <update.Form method="PATCH">
                <input value={id} name="id" hidden readOnly />
                <Button type="small">
                  {update.state === 'submitting'
                    ? 'Loading...'
                    : 'Make Priority'}
                </Button>
              </update.Form>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export async function loader({ params }) {
  const data = await getOrder(params.orderId);
  return data;
}

export async function action({ request }) {
  // Add Update cart functionality
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Update the order in the database
  await updateOrder(data.id, { priority: true });

  return null;
}

export default Order;
