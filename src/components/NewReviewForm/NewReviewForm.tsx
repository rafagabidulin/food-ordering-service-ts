import React, { useReducer } from 'react';
import classnames from 'classnames';
import { Rating } from '../Rating/Rating';
import { Sizes } from '../../constants/sizes';

import styles from './styles.module.css';

const FORM_ACTIONS = {
  changeName: 'changeName',
  changeText: 'changeText',
  changeRating: 'changeRating'
};

const reducer = (state, action) => {
  switch (action.type) {
    case FORM_ACTIONS.changeName: {
      return {
        name: action.payload,
        text: '',
        rating: 1
      };
    }
    case FORM_ACTIONS.changeText: {
      return {
        ...state,
        text: action.payload
      };
    }
    case FORM_ACTIONS.changeRating: {
      return {
        ...state,
        rating: action.payload
      };
    }
    default:
      return state;
  }
};

const initialState = {
  name: '',
  text: '',
  rating: 1
};

export const NewReviewForm = ({ className }) => {
  const [formState, dispatch] = useReducer(reducer, initialState);
  console.log(formState);

  return (
    <div className={classnames(styles.root, className)}>
      <h3>Add Review</h3>
      <div className={styles.section}>
        <label>Name</label>
        <input
          type='text'
          value={formState.name}
          onChange={(event) =>
            dispatch({
              type: FORM_ACTIONS.changeName,
              payload: event.target.value
            })
          }
        />
      </div>
      <div className={styles.section}>
        <label>Text</label>
        <input
          type='text'
          value={formState.text}
          onChange={(event) =>
            dispatch({
              type: FORM_ACTIONS.changeText,
              payload: event.target.value
            })
          }
        />
      </div>
      <div className={styles.section}>
        <label>Rating</label>
        <Rating
          size={Sizes.m}
          value={formState.rating}
          onChange={(value) =>
            dispatch({
              type: FORM_ACTIONS.changeRating,
              payload: value
            })
          }
        />
      </div>
    </div>
  );
};
