import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import COLORS from '../../constants/colors';

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


export default class InfinityLoader extends PureComponent {
  static defaultProps = {
    size: 150
  }
  static propTypes = {
    size: PropTypes.number,
  }

  render() {
    return (
      <Loader>
        <svg
          width={this.props.size}
          height={this.props.size}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          style={{ background: 'none' }}
        >
          <path
            fill="none"
            d="M24.3,30C11.4,30,5,43.3,5,50s6.4,20,19.3,20c19.3,0,32.1-40,51.4-40 C88.6,30,95,43.3,95,50s-6.4,20-19.3,20C56.4,70,43.6,30,24.3,30z"
            stroke={COLORS.BLUE}
            strokeWidth="3"
            strokeDasharray="2.5658892822265624 2.5658892822265624"
          >
            <animate
              attributeName="stroke-dashoffset"
              calcMode="linear"
              values="0;256.58892822265625"
              keyTimes="0;1"
              dur="1"
              begin="0s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </Loader>
    );
  }
}
