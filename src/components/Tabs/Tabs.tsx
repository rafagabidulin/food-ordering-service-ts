import React from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Tab } from '../Tab/Tab';
import { selectRestaurantIdsFilteredByName } from '../../store/restaurant/selectors';

import styles from './styles.module.css';

export const Tabs = () => {
  const [search, seSearch] = useSearchParams();
  const restaurantIds = useSelector((state) =>
    selectRestaurantIdsFilteredByName(state, {
      restaurantName: search.get('restaurantName') || ''
    })
  );

  return (
    <div className={styles.root}>
      <input
        value={search.get('restaurantName') || ''}
        onChange={(event) => {
          seSearch({ restaurantName: event.target.value });
        }}
        className={styles.input}
        placeholder='Search...'
      />
      <div>
        {restaurantIds.map((id) => (
          <Tab key={id} id={id} />
        ))}
      </div>
    </div>
  );
};
