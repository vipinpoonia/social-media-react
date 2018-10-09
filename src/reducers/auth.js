/*
  its a hack for login
  not implementing login page and functionality
  but will show a list of all users and ask to choose one
  after selecting a user will make loggedIn true .
*/

import {
  LOGIN_USER,
  LOGOUT_USER,
} from '../actions/index';


const auth = (
  state = {
    loggedIn: false,
    userId: ''
  },
  action
) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loggedIn: true,
        userId: action.userId
      };

    case LOGOUT_USER:
      return {
        ...state,
        loggedIn: false,
        userId: ''
      };

    default:
      return state;
  }
};

export default auth;
