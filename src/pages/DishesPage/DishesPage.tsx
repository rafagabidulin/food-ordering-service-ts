import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchAllDishes } from '../../store/dish';
import { selectDishIdsFilteredByName, selectIsDishLoading } from '../../store/dish/selectors';
import { Dish } from '../../components/Dish/Dish';

import styles from './styles.module.css';

export const DishesPage = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsDishLoading);

  const [search, seSearch] = useSearchParams();

  const dishes = useSelector((state) =>
    selectDishIdsFilteredByName(state, {
      dishName: search.get('dishName') || ''
    })
  );

  useEffect(() => {
    dispatch(fetchAllDishes());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input
        value={search.get('dishName') || ''}
        onChange={(event) => {
          seSearch({ dishName: event.target.value });
        }}
        className={styles.input}
        placeholder='Search...'
      />
      {dishes?.length > 0 && (
        <div>
          {dishes.map((id) => (
            <Dish key={id} dishId={id} className={styles.dish} withoutActions />
          ))}
        </div>
      )}
    </div>
  );
};
