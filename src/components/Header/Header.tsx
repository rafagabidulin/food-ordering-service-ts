import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

import Logo from './img/logo.svg';

export const Header = ({ className }) => (
  <header className={classnames(styles.root, className)}>
    <Link to='/'>
      <img src={Logo} alt='header_logo' loading='lazy' />
    </Link>
    <Link to='/restaurant'>Restaurants</Link>
    <Link to='/cart'>Cart</Link>
    <Link to='/dishes'>Dishes</Link>
  </header>
);
