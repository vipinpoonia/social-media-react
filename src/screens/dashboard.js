import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import avatar from '../img/avatar.jpg';
import {
  Card,
  Row,
  Col,
  AppAsside,
  TextInput,
  Image,
  SubmitButton,
  InfinityLoader,
} from '../comps/index';
import PostList from '../comps/postlist';
import Error from '../comps/error/index';
import { getSuggestedUsers, submitPost, updatePostList } from '../actioncreater/index';

const Main = styled.main`
  width: 50%;
  margin: 66px auto 0;
  z-index: 30;
`;

const ButtonContainer = styled.div`
  padding-top:8px;
`;


const Container = styled.div`
  margin: 66px auto 0;
  height: calc(100vh - 86px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

class Dashboard extends PureComponent {
  static propTypes = {
    currentUserData: PropTypes.object.isRequired,
    loggedInUserId: PropTypes.string.isRequired,
    getSuggestedUsers: PropTypes.func.isRequired,
    updatePostList: PropTypes.func.isRequired,
    submitPost: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isCreatingPost: PropTypes.bool.isRequired,
    createPostError: PropTypes.string.isRequired,
  };

  state = {
    postText: ''
  };

  componentDidMount() {
    const { loggedInUserId } = this.props;
    this.props.getSuggestedUsers(loggedInUserId);
  }

  componentDidUpdate() {
    if (this.props.createPostError) {
      toast.error(this.props.createPostError);
    }
  }

  handleSubmitClick = () => {
    const { currentUserData, loggedInUserId } = this.props;
    const text = this.state.postText.trim();
    if (text) {
      const data = {
        user_id: loggedInUserId,
        text
      };
      this.props.submitPost(data).then((response) => {
        const postData = {
          ...response.data,
          author: currentUserData.name,
          avatar: currentUserData.avatar
        };
        this.props.updatePostList(postData);
        this.setState({ postText: '' });
      }).catch(() => null);
    }
  }

  handleChange = (event) => {
    this.setState({ postText: event.target.value });
  }

  render() {
    const { isFetching, isCreatingPost, currentUserData } = this.props;
    if (isFetching) {
      return (
        <Container>
          <InfinityLoader />
        </Container>
      );
    }
    if (this.props.error) {
      return (
        <Container>
          <Error error={this.props.error} card={false} />
        </Container>
      );
    }
    return (
      <div>
        <AppAsside />
        <Main>
          <Card secondary gap={10}>
            <Row gutter>
              <Col>
                <Image
                  circular
                  borders
                  src={currentUserData.avatar || avatar}
                  height={30}
                  width={30}
                />
              </Col>
              <Col auto>
                <TextInput
                  name="post"
                  type="textarea"
                  placeholder="Whats happening?"
                  onChange={this.handleChange}
                  value={this.state.postText}
                />
              </Col>
            </Row>
            <Row gutter justifyContent="flex-end">
              <ButtonContainer>
                <SubmitButton
                  name="postsubmit"
                  onClick={this.handleSubmitClick}
                  value={isCreatingPost ? 'Posting...' : 'Post'}
                />
              </ButtonContainer>
            </Row>
          </Card>
          <PostList />
        </Main>
      </div>
    );
  }
}
/*
  idealy loading should be handeled for individual component
  but to save time adding loading to dashboard only
*/
const mapStateToProps = ({ users, auth, currentUser, posts, createPost }) => ({
  loggedInUserId: auth.userId,
  isCreatingPost: createPost.isCreating,
  currentUserData: currentUser.data,
  error: users.error || posts.error,
  createPostError: createPost.error,
  isFetching: currentUser.isFetching || users.isFetching || posts.isFetching,
});
const actioncreators = {
  getSuggestedUsers,
  submitPost,
  updatePostList
};

export default connect(mapStateToProps, actioncreators)(Dashboard);
