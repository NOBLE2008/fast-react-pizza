import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients = [] }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div className="flex flex-wrap justify-between py-3">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
          <p className="text-sm capitalize italic">
            {isLoadingIngredients
              ? 'Loading Ingredients...'
              : ingredients?.join(', ')}
          </p>
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
