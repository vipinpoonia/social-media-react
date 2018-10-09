import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CheckBox, PersonAdd } from 'styled-icons/material';
import { toast } from 'react-toastify';
import { Row, Text, Card } from '../index';
import List from '../list/index';
import COLORS from '../../constants/colors';
import { followUser, fetchNewData } from '../../actioncreater/index';


class Follow extends PureComponent {
  static propTypes = {
    followUser: PropTypes.func.isRequired,
    fetchNewData: PropTypes.func.isRequired,
    suggestedUsersToFollow: PropTypes.array.isRequired,
    loggedInUserId: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired
  }

  componentDidUpdate() {
    if (this.props.error) {
      toast.error(this.props.error);
    }
  }

  handleOnFollowClick = (followUserId) => {
    const { loggedInUserId } = this.props;
    this.props.followUser(loggedInUserId, followUserId)
      .then((response) => {
        if (response) {
          this.props.fetchNewData(loggedInUserId);
        }
      }).catch(() => null);
  }

  actionButton = (isFollowing) => {
    if (isFollowing) {
      return <CheckBox size={25} color={COLORS.BLUE} />;
    }
    return <PersonAdd size={25} color={COLORS.BLUE} />;
  }

  render() {
    return (
      <div>
        <Card>
          <Row gutter gap={10}>
            <Text size="xsmall" lighter>Follow Users</Text>
          </Row>
          <List
            onItemClick={this.handleOnFollowClick}
            items={this.props.suggestedUsersToFollow}
            separator
            actionButton={this.actionButton}
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ users, auth, follow }) => ({
  suggestedUsersToFollow: users.data,
  loggedInUserId: auth.userId,
  error: follow.error
});

const actioncreators = {
  followUser,
  fetchNewData,
};

export default connect(mapStateToProps, actioncreators)(Follow);
