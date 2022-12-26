import { useSelector } from 'react-redux';
import { selectCartDishIds } from '../../store/cart/selectors';
import { CartItem } from '../CartItem/CartItem';

export const Cart = () => {
  const dishIds = useSelector(selectCartDishIds);

  if (!dishIds?.length) {
    return <div>Empty</div>;
  }
  return (
    <div>
      {dishIds.map((dishId) => (
        <CartItem key={dishId} dishId={dishId} />
      ))}
    </div>
  );
};
