import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

export default function () {
  const middlewares = [thunk];

  /* eslint-disable no-underscore-dangle */
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line import/no-extraneous-dependencies, global-require
    const { logger } = require('redux-logger');
    middlewares.push(logger);
  }

  /* eslint-enable */
  return createStore(rootReducer, applyMiddleware(...middlewares));
}
