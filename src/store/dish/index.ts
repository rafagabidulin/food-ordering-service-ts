import { LoadingStatuses } from '../../constants/loadingStatuses';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { selectRestaurantMenuById } from '../restaurant/selectors';
import { selectDishById, selectDishIds } from './selectors';

export const fetchDishes = createAsyncThunk(
  'dish/fetchDishes',
  async (restaurantId, { getState, rejectWithValue }) => {
    const restaurantDihIds = selectRestaurantMenuById(getState(), {
      restaurantId
    });
    const dishIds = selectDishIds(getState());

    if (restaurantDihIds.every((id) => dishIds.includes(id))) {
      return rejectWithValue(LoadingStatuses.earlyAdded);
    }

    const response = await fetch(`http://localhost:3001/api/products?id=${restaurantId}`);
    return await response.json();
  }
);

export const fetchAllDishes = createAsyncThunk('dish/fetchAllDishes', async () => {
  const response = await fetch(`http://localhost:3001/api/products`);
  return await response.json();
});

export const fetchDishById = createAsyncThunk(
  'dish/fetchDishById',
  async (dishId, { getState, rejectWithValue }) => {
    const dish = selectDishById(getState(), { dishId });

    if (dish) {
      return rejectWithValue(LoadingStatuses.earlyAdded);
    }

    const response = await fetch(`http://localhost:3001/api/products?productId=${dishId}`);
    return await response.json();
  }
);

const dishEntityAdapter = createEntityAdapter();

export const dishSlice = createSlice({
  name: 'dish',
  initialState: dishEntityAdapter.getInitialState({
    status: LoadingStatuses.idle
  }),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchDishes.fulfilled, (state, { payload }) => {
        dishEntityAdapter.addMany(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchDishes.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded ? LoadingStatuses.success : LoadingStatuses.failed;
      })
      .addCase(fetchDishById.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchDishById.fulfilled, (state, { payload }) => {
        dishEntityAdapter.addOne(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchDishById.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded ? LoadingStatuses.success : LoadingStatuses.failed;
      })
      .addCase(fetchAllDishes.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchAllDishes.fulfilled, (state, { payload }) => {
        dishEntityAdapter.addMany(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchAllDishes.rejected, (state) => {
        state.status = LoadingStatuses.failed;
      })
});
