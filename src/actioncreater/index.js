import * as api from '../api/index';
import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  INVALIDATE_USER,

  FETCH_USER_LIST,
  FETCH_USER_LIST_SUCCESS,
  FETCH_USER_LIST_ERROR,
  INVALIDATE_USER_LIST,

  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  INVALIDATE_POSTS,

  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  INVALIDATE_CREATE_POST,

  FOLLOW_USER,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_ERROR,
  INVALIDATE_FOLLOW_USER,

  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_POST_LIST,
} from '../actions/index';

export const invalidateCurrentUser = () => (dispatch) => {
  dispatch({
    type: INVALIDATE_USER
  });
};

export const invalidateUsers = () => (dispatch) => {
  dispatch({
    type: INVALIDATE_USER_LIST
  });
};

export const invalidatePosts = () => (dispatch) => {
  dispatch({
    type: INVALIDATE_POSTS
  });
};

export const invalidatefollowUser = () => (dispatch) => {
  dispatch({
    type: INVALIDATE_FOLLOW_USER
  });
};

export const invalidateCreatePost = () => (dispatch) => {
  dispatch({
    type: INVALIDATE_CREATE_POST
  });
};

export const updatePostList = data => (dispatch) => {
  dispatch({
    type: UPDATE_POST_LIST,
    data
  });
};

export const invalidateStore = () => (dispatch) => {
  invalidateCurrentUser()(dispatch);
  invalidateUsers()(dispatch);
  invalidatePosts()(dispatch);
  invalidatefollowUser()(dispatch);
  invalidateCreatePost()(dispatch);
};

export const login = userId => (dispatch) => {
  dispatch({
    type: LOGIN_USER,
    userId
  });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });
};


const apiErrorHandler = (error, dispatch, errorActionType) => {
  dispatch({
    type: errorActionType,
    error: error.message
  });
};


export const getUser = userId => (dispatch, getState) => {
  const { currentUser } = getState();
  const dataLoaded = Object.keys(currentUser.data).length;
  if (currentUser.isFetching || (dataLoaded && !currentUser.didInvalidate)) {
    return Promise.resolve();
  }

  dispatch({ type: FETCH_USER });

  return api.fetchUser(userId).then(
    response => (
      dispatch({
        type: FETCH_USER_SUCCESS,
        data: response.data
      })
    ),
    error => apiErrorHandler(error, dispatch, FETCH_USER_ERROR)
  );
};

export const getAllUsers = userId => (dispatch, getState) => {
  const { users } = getState();
  const dataLoaded = users.data.length;
  if (users.isFetching || (dataLoaded && !users.didInvalidate)) {
    return Promise.resolve();
  }

  dispatch({ type: FETCH_USER_LIST });

  return api.fetchAllUsers(userId).then(
    response => (
      dispatch({
        type: FETCH_USER_LIST_SUCCESS,
        data: response.data
      })
    ),
    error => apiErrorHandler(error, dispatch, FETCH_USER_LIST_ERROR)
  );
};

export const getPosts = userId => (dispatch, getState) => {
  const { posts } = getState();
  const dataLoaded = posts.data.length;
  if (posts.isFetching || (dataLoaded && !posts.didInvalidate)) {
    return Promise.resolve();
  }

  dispatch({ type: FETCH_POSTS });

  return api.fetchPosts(userId).then(
    response => (
      dispatch({
        type: FETCH_POSTS_SUCCESS,
        data: response.data
      })
    ),
    error => apiErrorHandler(error, dispatch, FETCH_POSTS_ERROR)
  );
};

export const submitPost = data => (dispatch, getState) => {
  const { posts } = getState();
  if (posts.isCreating) {
    return Promise.resolve();
  }
  invalidateCreatePost()(dispatch);
  dispatch({
    type: CREATE_POST
  });
  return api.createPost(data).then(
    response => (
      dispatch({
        type: CREATE_POST_SUCCESS,
        data: response.data
      })
    ),
    error => apiErrorHandler(error, dispatch, CREATE_POST_ERROR)
  );
};

/*
  insted of writing different apis
  using the same api to get users to switch and
  to show suggested users to follow.
*/
export const getSuggestedUsers = userId => (dispatch, getState) => {
  invalidateUsers()(dispatch);
  getAllUsers(userId)(dispatch, getState);
};

export const followUser = (userId, followUserId) =>
  (dispatch, getState) => {
    const { posts } = getState();
    if (posts.isCreating) {
      return Promise.resolve();
    }
    invalidatefollowUser()(dispatch);
    dispatch({
      type: FOLLOW_USER
    });
    const data = {
      follow_user_id: followUserId
    };
    return api.followUser(userId, data).then(
      () => (
        dispatch({
          type: FOLLOW_USER_SUCCESS,
        })
      ),
      error => apiErrorHandler(error, dispatch, FOLLOW_USER_ERROR)
    );
  };
/*
  logging out old user and logging in new user
  also invalidating old data and fetching new data for user
*/
export const switchUser = userId => (dispatch, getState) => {
  invalidateStore()(dispatch);
  logout()(dispatch);
  login(userId)(dispatch);
  getAllUsers(userId)(dispatch, getState);
  getUser(userId)(dispatch, getState);
  getPosts(userId)(dispatch, getState);
};

/*
  on following new usere fetching new list of users and post
  idealy can handle by fetching only the post
*/
export const fetchNewData = userId => (dispatch, getState) => {
  invalidateStore()(dispatch);
  getAllUsers(userId)(dispatch, getState);
  getPosts(userId)(dispatch, getState);
};
