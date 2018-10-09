import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Card, Row, Text, InfinityLoader } from '../comps/index';
import List from '../comps/list/index';

import Error from '../comps/error/index';
import { getAllUsers, login } from '../actioncreater/index';

const LoginContainer = styled.div`
  margin: 66px auto 0;
  min-height: calc(100vh - 86px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

class Login extends PureComponent {
  static propTypes = {
    getAllUsers: PropTypes.func.isRequired,
    userList: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired,
    login: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.getAllUsers();
  }

  handleOnUserSelect = (userId) => {
    this.props.login(userId);
  }

  render() {
    if (this.props.isFetching) {
      return (
        <LoginContainer>
          <InfinityLoader />
        </LoginContainer>
      );
    }
    if (this.props.error) {
      return (
        <LoginContainer>
          <Error error={this.props.error} card={false} />
        </LoginContainer>
      );
    }
    const { userList } = this.props;
    return (
      <LoginContainer>
        <Card gap={10}>
          <Row gutter gap={10}>
            <Text size="medium" lighter> Please Select an user you want to login as : </Text>
          </Row>
          <List
            imgSize={56}
            size="large"
            separator
            onItemClick={this.handleOnUserSelect}
            items={userList}
          />
        </Card>
      </LoginContainer>
    );
  }
}
const mapStateToProps = ({ users }) => {
  const { error, isFetching, data } = users;
  return {
    error,
    isFetching,
    userList: data
  };
};

const actioncreators = {
  getAllUsers,
  login
};

export default connect(mapStateToProps, actioncreators)(Login);
