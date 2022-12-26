import { LoadingStatuses } from '../../constants/loadingStatuses';

export const selectReviewModuleState = (state) => state.review;

export const selectReviewIds = (state) => selectReviewModuleState(state).ids;

export const selectReviewEntities = (state) => selectReviewModuleState(state).entities;

export const selectReviewById = (state, { reviewId }) => selectReviewEntities(state)[reviewId];

export const selectReviewLoadingStatus = (state) => selectReviewModuleState(state).status;

export const selectIsReviewLoading = (state) =>
  selectReviewLoadingStatus(state) === LoadingStatuses.inProgress;
