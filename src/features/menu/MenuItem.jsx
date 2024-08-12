import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

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
            <Button type="secondary">Add to Cart</Button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
