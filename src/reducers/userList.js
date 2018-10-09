import {
  FETCH_USER_LIST,
  FETCH_USER_LIST_SUCCESS,
  FETCH_USER_LIST_ERROR,
  INVALIDATE_USER_LIST
} from '../actions/index';


const users = (
  state = {
    isFetching: false,
    didInvalidate: false,
    data: [],
    error: '',
  },
  action
) => {
  switch (action.type) {
    case FETCH_USER_LIST:
      return {
        ...state,
        didInvalidate: false,
        isFetching: true
      };

    case FETCH_USER_LIST_SUCCESS:
      return {
        ...state,
        didInvalidate: false,
        data: action.data,
        isFetching: false
      };

    case FETCH_USER_LIST_ERROR:
      return {
        ...state,
        didInvalidate: false,
        error: action.error,
        isFetching: false
      };

    case INVALIDATE_USER_LIST:
      return {
        ...state,
        didInvalidate: true,
        isFetching: false,
        error: '',
        data: []
      };

    default:
      return state;
  }
};

export default users;
