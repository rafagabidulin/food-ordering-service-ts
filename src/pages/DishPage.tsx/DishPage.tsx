import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchDishById } from '../../store/dish';
import { selectDishById, selectIsDishLoading } from '../../store/dish/selectors';
import {
  selectIsRestaurantLoading,
  selectRestaurantsByDish
} from '../../store/restaurant/selectors';
import { fetchRestaurants } from '../../store/restaurant';

export const DishPage = () => {
  const dispatch = useDispatch();
  const { dishId } = useParams();
  const dish = useSelector((state) => selectDishById(state, { dishId }));
  const restaurants = useSelector((state) => selectRestaurantsByDish(state, { dishId }));

  const isLoading = useSelector(selectIsDishLoading);
  const isRestaurantLoading = useSelector(selectIsRestaurantLoading);

  useEffect(() => {
    dispatch(fetchDishById(dishId));
  }, [dishId]);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!dish) {
    return <div>Empty</div>;
  }

  return (
    <div>
      <h2>{dish.name}</h2>
      {!isRestaurantLoading && restaurants?.length > 0 && (
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id}>
              <Link to={`/restaurant/${restaurant.id}`}>{restaurant.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
