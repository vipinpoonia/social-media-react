import {
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  INVALIDATE_CREATE_POST
} from '../actions/index';


const createPost = (
  state = {
    isCreating: false,
    post: {},
    error: ''
  },
  action
) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        isCreating: true
      };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        post: action.data,
        isCreating: false
      };

    case CREATE_POST_ERROR:
      return {
        ...state,
        error: action.error,
        isCreating: false
      };

    case INVALIDATE_CREATE_POST:
      return {
        ...state,
        isCreating: false,
        error: '',
        post: ''
      };

    default:
      return state;
  }
};

export default createPost;
