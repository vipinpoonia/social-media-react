import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import AppRouter from './router';
import store from './store';
import './app.css';


class App extends PureComponent {
  render() {
    return (
      <Provider store={store()}>
        <AppRouter />
      </Provider>
    );
  }
}

export default App;
