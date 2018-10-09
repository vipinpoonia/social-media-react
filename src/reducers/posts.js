import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  INVALIDATE_POSTS,
  UPDATE_POST_LIST
} from '../actions/index';


const posts = (
  state = {
    isFetching: false,
    didInvalidate: false,
    data: [],
    error: '',
  },
  action
) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        didInvalidate: false,
        isFetching: true
      };

    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        didInvalidate: false,
        data: action.data,
        isFetching: false
      };

    case FETCH_POSTS_ERROR:
      return {
        ...state,
        didInvalidate: false,
        error: action.error,
        isFetching: false
      };

    case INVALIDATE_POSTS:
      return {
        ...state,
        didInvalidate: true,
        isFetching: false,
        error: '',
        data: []
      };
    case UPDATE_POST_LIST:
      return {
        ...state,
        data: [
          action.data,
          ...state.data
        ]
      };
    default:
      return state;
  }
};

export default posts;
