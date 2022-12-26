import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserById } from '../../store/user/selectors';

export const User = ({ id }) => {
  const user = useSelector((state) => selectUserById(state, { userId: id }));
  if (!user) {
    return null;
  }
  return <div>{user.name}</div>;
};
