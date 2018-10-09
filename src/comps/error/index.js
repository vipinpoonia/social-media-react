import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, FlexCard } from '../index';

export default class Error extends PureComponent {
  static defaultProps = {
    error: 'Something went wrong please try again.',
    card: true
  };
  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    card: PropTypes.boolean
  };

  render() {
    if (!this.props.card) {
      return (
        <Text size="medium">
          { this.props.error }
        </Text>
      );
    }
    return (
      <FlexCard
        cover
        justifyContent="space-around"
        alignItems="center"
      >
        <Text size="medium">
          { this.props.error }
        </Text>
      </FlexCard>
    );
  }
}
