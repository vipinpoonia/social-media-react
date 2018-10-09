import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import COLORS from '../../constants/colors';


const Button = styled.button`
  width: 100%;
  background-color: ${COLORS.BLUE};
  color: ${COLORS.WHITE};
  height: 28px;
  line-height: 28px;
  padding: 0 25px;
  font-size: 14px;
  cursor: pointer; 
  border: none;
  border-radius: 14px;
  }
  &:focus {
    outline: none;
  }
  &:active {
    outline: none;
  }
`;

export default class SubmitButton extends PureComponent {
  static defaultProps = {
    onCLick: () => {},
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    onCLick: PropTypes.func,
    value: PropTypes.string.isRequired,
  };

  render() {
    const { name, onCLick, ...other } = this.props;

    return (
      <Button
        id={`id_${name}`}
        name={name}
        onCLick={onCLick}
        {...other}
      >
        { this.props.value }
      </Button>
    );
  }
}
