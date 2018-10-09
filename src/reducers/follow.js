import {
  FOLLOW_USER,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_ERROR,
  INVALIDATE_FOLLOW_USER
} from '../actions/index';


const follow = (
  state = {
    isCreating: false,
    error: ''
  },
  action
) => {
  switch (action.type) {
    case FOLLOW_USER:
      return {
        ...state,
        isCreating: true
      };

    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        isCreating: false
      };

    case FOLLOW_USER_ERROR:
      return {
        ...state,
        error: action.error,
        isCreating: false
      };

    case INVALIDATE_FOLLOW_USER:
      return {
        ...state,
        isCreating: false,
        error: '',
      };

    default:
      return state;
  }
};

export default follow;
