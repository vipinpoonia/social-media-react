import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import avatar from '../../img/avatar.jpg';
import {
  Row,
  FlexView,
  Text,
  Col,
  Card,
  Image,
  Separator
} from '../index';
import LAYOUT from '../../constants/layout';
import { getPosts } from '../../actioncreater/index';

class Post extends PureComponent {
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  renderImage() {
    const { post } = this.props;
    if (post.content_type !== 'IMG') {
      return null;
    }
    return (
      <Col gutter={0}>
        <Image
          src={post.content}
        />
      </Col>
    );
  }

  render() {
    const { post } = this.props;
    return (
      <div>
        <Separator
          transparent
          height={LAYOUT.CARD_GAP}
        />
        <Card>
          <Row gutter gap={12}>
            <Col>
              <Image
                circular
                border
                src={post.avatar || avatar}
                height={40}
                width={40}
              />
            </Col>
            <Col auto>
              <FlexView>
                <Col gutter={0}>
                  <Row>
                    <Col gutter={0}>
                      <Text>{post.author}</Text>
                    </Col>
                    <Col>
                      <Text secondary>.</Text>
                    </Col>
                    <Col gutter={0}>
                      <Text secondary>{post.created_on}</Text>
                    </Col>
                  </Row>
                </Col>
                <Separator
                  transparent
                  height={8}
                />
                <Col gutter={0}>
                  <Text size="small">{post.text}</Text>
                </Col>
                <Separator
                  transparent
                  height={8}
                />
                {this.renderImage()}
              </FlexView>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

class PostList extends PureComponent {
  static propTypes = {
    postList: PropTypes.array.isRequired,
    getPosts: PropTypes.func.isRequired,
    loggedInUserId: PropTypes.string.isRequired
  }

  componentDidMount() {
    if (this.props.loggedInUserId) {
      this.props.getPosts(this.props.loggedInUserId);
    }
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedInUserId && this.props.loggedInUserId) {
      this.props.getPosts(this.props.loggedInUserId);
    }
  }
  renderPost() {
    const { postList } = this.props;
    return postList.map((post, index) => (
      <Post
        key={post.id || index}
        post={post}
      />
    ));
  }

  render() {
    return (
      <div>
        {this.renderPost()}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, posts }) => ({
  loggedInUserId: auth.userId,
  postList: posts.data,
});

const actioncreators = {
  getPosts
};

export default connect(mapStateToProps, actioncreators)(PostList);
