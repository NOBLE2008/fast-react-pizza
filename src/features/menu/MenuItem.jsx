import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addToCart } from '../cart/cartSlice';
import { useNavigate } from 'react-router-dom';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const cart = useSelector((state) => state.cart.cart)
  const navigate = useNavigate()
  const isInCart = cart.find((item) => item.pizzaId === id)
  const dispatch = useDispatch()

  return (
    <li className="flex gap-4">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut && 'opacity-70 grayscale'}`}
      />
      <div className="flex grow justify-between">
        <div className="flex flex-col grow">
          <p className="font-semibold">{name}</p>
          <p className="text-sm capitalize italic text-stone-500">
            {ingredients.join(', ')}
          </p>
          <div className="mt-auto flex grow items-end justify-between text-sm">
            {!soldOut ? (
              <p>{formatCurrency(unitPrice)}</p>
            ) : (
              <p className="uppercase text-stone-500">Sold out</p>
            )}
            {
              isInCart ? <Button type='small' onClick={() => {
                navigate(`/cart`)
              }}>
                Go to Cart
              </Button> : <Button type="small" onClick={() => {
                // Add to cart logic
                dispatch(addToCart({
                  pizzaId: id,
                  name,
                  quantity: 1,
                  unitPrice,
                  totalPrice: unitPrice,
                }))
              }}>Add to Cart</Button>
            }
            
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
