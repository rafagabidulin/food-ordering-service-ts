import { RootState } from '..';

export const selectCartModuleState = (state: RootState) => state.cart;

export const selectCartDishIds = (state: RootState) => Object.keys(state.cart);

export const selectDishCountByid = (state: RootState, { dishId }: { dishId: number }) =>
  selectCartModuleState(state)[dishId] || 0;
