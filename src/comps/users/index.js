import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AngleLeft, AngleDown } from 'styled-icons/fa-solid';
import { TriangleUp } from 'styled-icons/octicons';
import styled from 'styled-components';
import Image from '../image/index';
import avatar from '../../img/avatar.jpg';
import { Row, Col, Text, Card } from '../index';
import List from '../list/index';
import COLORS from '../../constants/colors';
import { switchUser } from '../../actioncreater/index';

const UserList = styled.div`
  margin-left: 25%;
  margin-top: 16px;
  position: relative;
  display: ${({ open }) => open ? 'block' : 'none'} ;
`;

const ListHeaderIcon = TriangleUp.extend`
  position: absolute;
  color: ${COLORS.LIGHT_BLUE};
  color: ${COLORS.WHITE};
  top: -17px;
  right: 10px;
`;

class Users extends PureComponent {
  static propTypes = {
    switchUser: PropTypes.func.isRequired,
    userList: PropTypes.array.isRequired,
    loggedInUser: PropTypes.object.isRequired
  }

  state = {
    open: false
  };

  onHeaderIconClick = () => {
    const { open } = this.state;
    this.setState({
      open: !open
    });
  }

  getHeaderIcon() {
    if (this.state.open) {
      return <AngleDown size={18} color={COLORS.TEXT_SECONDARY} />;
    }
    return <AngleLeft size={18} color={COLORS.TEXT_SECONDARY} />;
  }

  handleOnItemClick = (userId) => {
    const { open } = this.state;
    this.setState({
      open: !open
    });
    this.props.switchUser(userId);
  }

  render() {
    const { loggedInUser, userList } = this.props;
    return (
      <div>
        <Card gap>
          <Row gutter>
            <Text size="xsmall" lighter>Logged in as</Text>
          </Row>
          <Row gutter gap alignItems="center">
            <Col>
              <Image
                circular
                border
                src={loggedInUser.avatar || avatar}
                height={46}
                width={46}
              />
            </Col>
            <Col>
              <Text size="large">{loggedInUser.name}</Text>
            </Col>
          </Row>
        </Card>
        <Card secondary gap={10} onClick={this.onHeaderIconClick}>
          <Row gutter alignItems="center" justifyContent="space-between">
            <Col>
              <Text size="small">Change User </Text>
            </Col>
            <Col>
              {this.getHeaderIcon()}
            </Col>
          </Row>
        </Card>
        <UserList open={this.state.open}>
          <ListHeaderIcon size={25} />
          <Card gap={10}>
            <List
              onItemClick={this.handleOnItemClick}
              items={userList}
            />
          </Card>
        </UserList>
      </div>
    );
  }
}

const mapStateToProps = ({ users, currentUser }) => ({
  userList: users.data,
  loggedInUser: currentUser.data
});

const actioncreators = {
  switchUser
};

export default connect(mapStateToProps, actioncreators)(Users);
