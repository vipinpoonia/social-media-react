import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import coverImg from '../../img/cover.png';
import avatar from '../../img/avatar.jpg';
import Image from '../image/index';
import { Row, Col, Text, FlexView, Card } from '../index';
import LAYOUT from '../../constants/layout';

import { getUser } from '../../actioncreater/index';

const Cover = styled.div`
  height: 70px;
  background-image: ${({ image }) => `url(${image || coverImg})`};
  background-repeat: no-repeat;
  background-position: center; 
  background-size: cover;
`;

const AvatarImage = Image.extend`
  margin: -23px auto 0;
`;

const ProfileWrapper = styled.div`
  padding-bottom: ${`${LAYOUT.GAP}px`};
`;

class Profile extends PureComponent {
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
    loggedInUserId: PropTypes.string.isRequired,
  }
  componentDidMount() {
    if (this.props.loggedInUserId) {
      this.props.getUser(this.props.loggedInUserId);
    }
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedInUserId && this.props.loggedInUserId) {
      this.props.getUser(this.props.loggedInUserId);
    }
  }

  render() {
    const { userData } = this.props;
    return (
      <Card>
        <ProfileWrapper>
          <Cover image={userData.cover} />
          <AvatarImage
            src={userData.avatar || avatar}
            circular
            border
            height={56}
            width={56}
          />
          <Row justifyContent="space-around">
            <Col gap>
              <Text size="large">{userData.name}</Text>
            </Col>
          </Row>
          <Row justifyContent="space-around">
            <Col gutter={0}>
              <FlexView alignItems="center">
                <Text size="medium">{userData.post_count}</Text>
                <Text size="xsmall" lighter>POSTS</Text>
              </FlexView>
            </Col>
            <Col gutter={0}>
              <FlexView alignItems="center">
                <Text size="medium">{userData.following_count}</Text>
                <Text size="xsmall" lighter>FOLLOWING</Text>
              </FlexView>
            </Col>
          </Row>
        </ProfileWrapper>
      </Card>
    );
  }
}

const mapStateToProps = ({ auth, currentUser }) => ({
  loggedInUserId: auth.userId,
  isFetching: currentUser.isFetching,
  userData: currentUser.data
});

const actioncreators = {
  getUser
};

export default connect(mapStateToProps, actioncreators)(Profile);
