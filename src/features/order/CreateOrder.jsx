import { useEffect, useRef, useState } from 'react';
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Loader from '../../ui/Loader';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import store from '../../store';
import { clearCart } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const username = useSelector((state) => state.user.username);
  const navigation = useNavigation();
  const isLoading = navigation.state === 'submitting';
  const path = navigation.formAction;
  const cart = useSelector((state) => state.cart.cart);
  const [totalPrice, setTotalPrice] = useState(function () {
    return cart.reduce((prev, cur) => prev + cur.totalPrice, 0);
  });

  const formError = useActionData();

  useEffect(() => {
    if (withPriority) {
      setTotalPrice((cur) => {
        return cur + cur * 0.2;
      });
    }else{
      setTotalPrice((cur) => {
       return cart.reduce((prev, cur) => prev + cur.totalPrice, 0);
      });
    }
  }, [withPriority, cart])
  const handleClick = () => {
    setWithPriority((cur) => {
      return !cur;
    });
  };

  const input = useRef();
  if (cart.length <= 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <Link
          to="/menu"
          className="text-blue-500 hover:text-blue-600 hover:underline sm:text-base"
        >
          &larr; Back to menu
        </Link>
      </div>
    );
  }
  return (
    <div className="mx-4 my-6">
      {isLoading && path === '/order/new' && <Loader />}
      {!isLoading && navigation.state !== 'loading' && (
        <div className="mx-auto">
          <h2 className="mb-6 text-center font-bold">
            Ready to order? Let's go!
          </h2>

          <Form method="POST" className="flex flex-col items-center space-y-3">
            <div className="w-full">
              <label>
                First Name <span className="text-sm text-red-600">*</span>
              </label>
              <br />
              <input
                type="text"
                name="customer"
                required
                className="input"
                defaultValue={username}
              />
            </div>

            <div className="w-full">
              <label>
                Phone number <span className="text-sm text-red-600">*</span>
              </label>
              <div>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="input"
                  ref={input}
                />
                {formError?.phone && (
                  <p
                    className="mt-2 rounded-lg bg-red-100 p-1.5 text-xs text-red-600"
                    onClick={() => {
                      input.current.focus();
                    }}
                  >
                    {formError.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full">
              <label>
                Address <span className="text-sm text-red-600">*</span>
              </label>
              <div>
                <input type="text" name="address" required className="input" />
              </div>
            </div>

            <div>
              <input
                onClick={handleClick}
                type="checkbox"
                name="priority"
                id="priority"
                className="h-4 w-4 accent-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:ring-offset-1"
                // value={withPriority}
                // onChange={(e) => setWithPriority(e.target.checked)}
              />
              <label htmlFor="priority">
                Want to you give your order priority?
              </label>
            </div>

            <div>
            <Button>Order Now: {formatCurrency(totalPrice)}</Button>
            </div>
            <input
              type="text"
              hidden
              name="cart"
              value={JSON.stringify(cart)}
            />
          </Form>
        </div>
      )}
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const err = {};
  // Add validation for phone number here
  if (!isValidPhone(data.phone)) err.phone = 'Phone Number is invalid';
  if (Object.keys(err).length > 0) return err;

  const newOrder = await createOrder({
    ...data,
    cart: JSON.parse(data.cart),
    priority: data?.priority === 'on',
  });

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
