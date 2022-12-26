import { useSelector } from 'react-redux';
import { selectDishById } from '../../store/dish/selectors';
import { selectDishCountByid } from '../../store/cart/selectors';

export const CartItem = ({ dishId }) => {
  const dish = useSelector((state) => selectDishById(state, { dishId }));
  const count = useSelector((state) => selectDishCountByid(state, { dishId: dish?.id }));

  return (
    <div>
      {dish.name}-{count}
    </div>
  );
};
