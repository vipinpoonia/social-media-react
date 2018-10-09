import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { Header, Container } from '../comps';

const Root = styled.div`
  position: relative;
`;

class PrivateRoute extends PureComponent {
  static defaultProps = {
    access: true
  };

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    access: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
  };

  render() {
    const {
      loggedIn, access, component: Component, ...rest
    } = this.props;

    return (
      <div>
        <Route
          {...rest}
          render={(props) => {
            if (loggedIn) {
              if (access) {
                return (
                  <Root>
                    <Header />
                    <Container>
                      <Component {...props} />
                    </Container>
                  </Root>
                );
              }
              return (
                <Redirect
                  to={{
                    pathname: '/'
                  }}
                />
              );
            }
            return (
              <Redirect
                to={{
                  pathname: '/login'
                }}
              />
            );
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ auth: { loggedIn } }) => ({
  loggedIn
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));
