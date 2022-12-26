import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { LoadingStatuses } from '../../constants/loadingStatuses';
import { selectRestaurantReviewsById } from '../restaurant/selectors';
import { selectReviewIds } from './selectors';

export const fetchReviews = createAsyncThunk(
  'review/fetchReviews',
  async (restaurantId, { getState, rejectWithValue }) => {
    const restaurantReviewIds = selectRestaurantReviewsById(getState(), {
      restaurantId
    });
    const reviewIds = selectReviewIds(getState());

    if (restaurantReviewIds.every((id) => reviewIds.includes(id))) {
      return rejectWithValue(LoadingStatuses.earlyAdded);
    }

    const response = await fetch(`http://localhost:3001/api/reviews?id=${restaurantId}`);
    return await response.json();
  }
);

const reviewEntityAdapter = createEntityAdapter();

export const reviewSlice = createSlice({
  name: 'review',
  initialState: reviewEntityAdapter.getInitialState({
    status: LoadingStatuses.idle
  }),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchReviews.fulfilled, (state, { payload }) => {
        reviewEntityAdapter.addMany(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchReviews.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded ? LoadingStatuses.success : LoadingStatuses.failed;
      })
});
