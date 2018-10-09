import React, { PureComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import LAYOUT from './constants/layout';
import COLORS from './constants/colors';
import PrivateRoute from './routers/private';
import PublicRoute from './routers/public';
import Dashboard from './screens/dashboard';
import Login from './screens/login';


const THEME = {
  LAYOUT,
  COLORS,
};

class AppRouter extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={THEME}>
          <div>
            <ToastContainer />
            <div>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PublicRoute exact path="/login/" component={Login} />
            </div>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
