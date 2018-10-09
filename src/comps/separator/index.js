import styled from 'styled-components';
import COLORS from '../../constants/colors';

export default styled.div`
  height: ${({ height }) => `${height || 1}px`};
  background-color: ${({ transparent }) => transparent ? 'transparent' : COLORS.BORDER};
`;
