import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { selectRestaurantById } from '../../store/restaurant/selectors';

import styles from './styles.module.css';

export const Tab = ({ id }) => {
  const { name } = useSelector((state) => selectRestaurantById(state, { restaurantId: id }));
  return (
    <NavLink
      to={id}
      className={({ isActive }) =>
        classnames(styles.root, {
          [styles.active]: isActive
        })
      }
    >
      {name}
    </NavLink>
  );
};
