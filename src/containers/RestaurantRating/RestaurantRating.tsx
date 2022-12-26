import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from '../../components/Rating/Rating';
import { Sizes } from '../../constants/sizes';
import { createSelectRestaurantRating } from '../../store/restaurant/selectors';
import { fetchReviews } from '../../store/review';
import { selectIsReviewLoading } from '../../store/review/selectors';

export const RestaurantRating = ({ restaurantId, ...props }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReviews(restaurantId));
  }, [restaurantId]);

  const selectRestaurantRating = useCallback(createSelectRestaurantRating(), []);

  const rating = useSelector((state) => selectRestaurantRating(state, { restaurantId }));

  const isLoading = useSelector(selectIsReviewLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Rating size={Sizes.l} value={rating} {...props} />;
};
