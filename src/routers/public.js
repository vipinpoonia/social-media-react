import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';


class PublicRoute extends PureComponent {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
      .isRequired
  };

  render() {
    const {
      loggedIn, component: Component, ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={(props) => {
          if (loggedIn) {
            return (
              <Redirect
                to={{
                  pathname: '/',
                }}
              />
            );
          }
          return <Component {...props} />;
        }}
      />
    );
  }
}

const mapStateToProps = ({ auth: { loggedIn } }) => ({
  loggedIn
});
export default withRouter(connect(mapStateToProps)(PublicRoute));
