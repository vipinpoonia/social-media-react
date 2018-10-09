import { combineReducers } from 'redux';
import createPost from './createPost';
import currentUser from './user';
import users from './userList';
import posts from './posts';
import follow from './follow';
import auth from './auth';


const rootReducer = combineReducers({
  auth,
  createPost,
  currentUser,
  users,
  posts,
  follow
});

export default rootReducer;
