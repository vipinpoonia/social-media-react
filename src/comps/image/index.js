import styled from 'styled-components';
import COLORS from '../../constants/colors';

const getBorder = (border) => {
  if (typeof border === 'boolean') {
    return `1px solid ${COLORS.BORDER}`;
  } else if (border) {
    return border;
  }
  return 'none';
};

const Image = styled.img`
  display: block;
  width: ${({ width }) => width ? `${width}px` : '100%'};
  height: ${({ height }) => height ? `${height}px` : 'auto'};
  border-radius: ${({ circular }) => circular ? '50%' : 0};
  border: ${({ border }) => getBorder(border)};
`;

export default Image;
