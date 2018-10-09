import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Image from '../image/index';
import avatar from '../../img/avatar.jpg';
import { Row, Col, Text, Separator } from '../index';


const ListItem = styled.div`
  cursor: ${({ cursor }) => cursor};
  &:focus {
    outline: none;
  }
  &:active {
    outline: none;
  }
`;


const ActionButton = styled.span`
  display: inline-block;
  cursor: pointer;
  cursor: ${({ cursor }) => cursor};
`;

class Item extends PureComponent {
  static defaultProps = {
    separator: false,
    actionButton: false,
    size: 'small',
    imgSize: 36
  }

  static propTypes = {
    item: PropTypes.object.isRequired,
    onItemClick: PropTypes.func.isRequired,
    size: PropTypes.string,
    separator: PropTypes.bool,
    imgSize: PropTypes.number,
    actionButton: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  };


  onClick = () => {
    const { onItemClick, item } = this.props;
    onItemClick(item.id);
  }

  render() {
    const { item, actionButton, separator, imgSize, size } = this.props;
    return (
      <ListItem
        onClick={actionButton ? null : this.onClick}
        cursor={actionButton ? 'default' : 'pointer'}
      >
        {separator ? <Separator /> : null}
        <Row gap={5} gutter alignItems="center">
          <Col>
            <Image
              circular
              borders
              src={item.avatar || avatar}
              height={imgSize}
              width={imgSize}
            />
          </Col>
          <Col>
            <Text size={size}>{item.name}</Text>
          </Col>
          <Col auto>
            <Row justifyContent="flex-end">
              <ActionButton
                onClick={item.is_following ? null : this.onClick}
                cursor={item.is_following ? 'not-allowed' : 'pointer'}
              >
                {actionButton
                  ? this.props.actionButton(item.is_following)
                  : null
                }
              </ActionButton>
            </Row>
          </Col>
        </Row>
      </ListItem>
    );
  }
}

export default class List extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired,
  };

  renderItems() {
    const { items, onItemClick, ...rest } = this.props;
    return items.map((item, index) => (
      <Item
        item={item}
        key={item.id || index}
        onItemClick={onItemClick}
        {...rest}
      />
    ));
  }
  render() {
    return (
      <div>
        {this.renderItems()}
      </div>
    );
  }
}
