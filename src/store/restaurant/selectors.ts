import { LoadingStatuses } from '../../constants/loadingStatuses';
import { selectReviewEntities } from '../review/selectors';
import { createSelector } from '@reduxjs/toolkit';

export const selectRestaurantModuleState = (state) => state.restaurant;

export const selectRestaurantIds = (state) => selectRestaurantModuleState(state).ids;

export const selectRestaurantIdsFilteredByName = (state, { restaurantName }) =>
  Object.values(selectRestaurantEntities(state))
    .filter(({ name }) => name.toLowerCase().indexOf(restaurantName.toLowerCase()) !== -1)
    .map(({ id }) => id);

export const selectRestaurantEntities = (state) => selectRestaurantModuleState(state).entities;

export const selectRestaurantById = (state, { restaurantId }) =>
  selectRestaurantEntities(state)[restaurantId];

export const selectRestaurantLoadingStatus = (state) => selectRestaurantModuleState(state).status;

export const selectRestaurantsByDish = (state, { dishId }) =>
  Object.values(selectRestaurantEntities(state)).filter((restaurant) =>
    restaurant.menu.includes(dishId)
  );

export const selectIsRestaurantLoading = (state) =>
  [LoadingStatuses.inProgress, LoadingStatuses.idle].includes(selectRestaurantLoadingStatus(state));

export const selectRestaurantMenuById = (state, { restaurantId }) =>
  selectRestaurantById(state, { restaurantId })?.menu;

export const selectRestaurantReviewsById = (state, { restaurantId }) =>
  selectRestaurantById(state, { restaurantId })?.reviews;

export const createSelectRestaurantRating = () =>
  createSelector(
    [selectRestaurantReviewsById, selectReviewEntities],
    (restaurantReviewIds, reviewEntities) =>
      Math.floor(
        restaurantReviewIds.reduce(
          (sum, reviewId) => sum + (reviewEntities[reviewId]?.rating || 0),
          0
        ) / restaurantReviewIds.length
      )
  );
