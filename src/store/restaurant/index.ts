import { LoadingStatuses } from '../../constants/loadingStatuses';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { selectRestaurantIds } from './selectors';

export const fetchRestaurants = createAsyncThunk(
  'restaurant/fetchRestaurants',
  async (_, thunkAPI) => {
    if (selectRestaurantIds(thunkAPI.getState()).length > 0) {
      return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
    }

    const response = await fetch('http://localhost:3001/api/restaurants/');
    return await response.json();
  }
);

const restaurantEntityAdapter = createEntityAdapter();

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: restaurantEntityAdapter.getInitialState({
    status: LoadingStatuses.idle
  }),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchRestaurants.fulfilled, (state, { payload }) => {
        restaurantEntityAdapter.addMany(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchRestaurants.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded ? LoadingStatuses.success : LoadingStatuses.failed;
      })
});
