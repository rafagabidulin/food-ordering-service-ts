export const selectUserModuleState = (state) => state.user;

export const selectUserIds = (state) => selectUserModuleState(state).ids;

export const selectUserEntities = (state) => selectUserModuleState(state).entities;

export const selectUserById = (state, { userId }) => selectUserEntities(state)[userId];
