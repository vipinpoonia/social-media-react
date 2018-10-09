import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  INVALIDATE_USER
} from '../actions/index';


const currentUser = (
  state = {
    isFetching: false,
    didInvalidate: false,
    data: {},
    error: '',
  },
  action
) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        didInvalidate: false,
        isFetching: true
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        didInvalidate: false,
        data: action.data,
        isFetching: false
      };

    case FETCH_USER_ERROR:
      return {
        ...state,
        didInvalidate: false,
        error: action.error,
        isFetching: false
      };

    case INVALIDATE_USER:
      return {
        ...state,
        didInvalidate: true,
        isFetching: false,
        error: '',
        data: {}
      };

    default:
      return state;
  }
};

export default currentUser;
