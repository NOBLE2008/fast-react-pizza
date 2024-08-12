import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Loader from '../../ui/Loader';
import Button from '../../ui/Button';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

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

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isLoading = navigation.state === 'submitting';
  const path = navigation.formAction;

  const formError = useActionData();
  return (
    <div className="mx-4 my-6">
      {isLoading && path === '/order/new' && <Loader />}
      {!isLoading && navigation.state !== 'loading' && (
        <div className="mx-auto">
          <h2 className="text-center font-bold mb-6">Ready to order? Let's go!</h2>

          <Form method="POST" className="flex flex-col space-y-3 items-center">
            <div className="w-full">
              <label>
                First Name <span className="text-sm text-red-600">*</span>
              </label>
              <br />
              <input type="text" name="customer" required className="input" />
            </div>

            <div className="w-full">
              <label>
                Phone number <span className="text-sm text-red-600">*</span>
              </label>
              <div>
                <input type="tel" name="phone" required className="input" />
                {formError?.phone && (
                  <p className="text-xs text-red-600 p-1.5 bg-red-100 mt-2 rounded-lg">{formError.phone}</p>
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
              <Button>Order Now</Button>
            </div>
            <input
              type="text"
              hidden
              name="cart"
              value={JSON.stringify(fakeCart)}
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

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
