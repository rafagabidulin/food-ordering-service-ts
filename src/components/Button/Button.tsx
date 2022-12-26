import React from 'react';
import classnames from 'classnames';
import { Sizes } from '../../constants/sizes';
import { ButtonTypes } from './constants';

import styles from './styles.module.css';
import { IButton } from '../../types';

export const Button: React.FC<IButton> = ({
  children,
  size = Sizes.m,
  type = ButtonTypes.primary,
  onClick,
  className
}) => (
  <button
    className={classnames(styles.root, className, styles[size], styles[type])}
    onClick={onClick}
  >
    {children}
  </button>
);
