import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import COLORS from '../../constants/colors';


const TextAreaInput = styled.textarea`
  width: 100%;
  background-color: ${COLORS.WHITE}
  color: ${COLORS.TEXT_PRIMARY};
  height: ${({ height }) => height ? `${height}px` : '65px'};
  padding: 5px;
  font-size: 14px;
  font-family: 'Open sans', sans-serif;
  border: 2px solid ${COLORS.BLUE};
  border-radius: 5px;
  resize: none;
  &:focus {
    outline: none;
  }
  &:active {
    outline: none;
  }
`;

export default class TextInput extends PureComponent {
  static defaultProps = {
    placeholder: '',
    label: null,
    onChange: () => {}
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string.isRequired
  };

  render() {
    const { name, type, label, onChange, placeholder, ...other } = this.props;

    return (
      <TextAreaInput
        id={`id_${name}`}
        name={name}
        type={type}
        ref={(node) => {
          this.input = node;
        }}
        value={this.props.value}
        onChange={onChange}
        placeholder={placeholder}
        {...other}
      />
    );
  }
}
