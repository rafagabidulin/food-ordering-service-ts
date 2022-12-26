import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Review } from '../Review/Review';
import { selectRestaurantReviewsById } from '../../store/restaurant/selectors';
import { selectIsReviewLoading } from '../../store/review/selectors';
import { fetchReviews } from '../../store/review';
import { fetchUsers } from '../../store/user';
import { NewReviewForm } from '../NewReviewForm/NewReviewForm';

export const Reviews = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const reviews = useSelector((state) => selectRestaurantReviewsById(state, { restaurantId }));

  const isLoading = useSelector(selectIsReviewLoading);

  useEffect(() => {
    dispatch(fetchReviews(restaurantId));
  }, [restaurantId]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!reviews?.length) {
    return null;
  }

  return (
    <div>
      <h3>Reviews</h3>
      <ul>
        {reviews.map((id) => (
          <li key={id}>
            <Review id={id} />
          </li>
        ))}
      </ul>
      <NewReviewForm />
    </div>
  );
};
