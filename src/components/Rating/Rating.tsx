import React from 'react';
import classnames from 'classnames';
import { MAX_RATING } from './constants';
import Star from './img/star.svg';
import GoldStar from './img/star-gold.svg';

import styles from './styles.module.css';
import { Sizes } from '../../constants/sizes';

export const Rating = ({ value, size = Sizes.m, onChange, maxRating = MAX_RATING, className }) => (
  <div className={className}>
    {maxRating > 0 &&
      new Array(maxRating)
        .fill(null)
        .map((_, index) => (
          <img
            src={index >= value ? Star : GoldStar}
            alt='star'
            key={index}
            className={classnames(styles.star, styles[size])}
            loading='lazy'
            onClick={() => onChange(index + 1)}
          />
        ))}
  </div>
);
