import { LoadingStatuses } from '../../constants/loadingStatuses';

export const selectDishModuleState = (state) => state.dish;

export const selectDishIds = (state) => selectDishModuleState(state).ids;

export const selectDishEntities = (state) => selectDishModuleState(state).entities;

export const selectDishById = (state, { dishId }) => selectDishEntities(state)[dishId];

export const selectDishLoadingStatus = (state) => selectDishModuleState(state).status;

export const selectIsDishLoading = (state) =>
  selectDishLoadingStatus(state) === LoadingStatuses.inProgress;

export const selectDishIdsFilteredByName = (state, { dishName }) =>
  Object.values(selectDishEntities(state))
    .filter(({ name }) => name.toLowerCase().indexOf(dishName.toLowerCase()) !== -1)
    .map(({ id }) => id);
