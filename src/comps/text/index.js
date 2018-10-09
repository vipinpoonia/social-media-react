import styled from 'styled-components';

const getColor = ({ secondary, lighter, invert, theme: { COLORS } }) => {
  if (secondary) {
    return COLORS.TEXT_SECONDARY;
  }

  if (lighter) {
    return COLORS.TEXT_LIGHT;
  }

  if (invert) {
    return COLORS.WHITE;
  }

  return COLORS.TEXT_PRIMARY;
};

const getFontWeight = ({ semibold, bold }) => {
  if (semibold) {
    return 600;
  } else if (bold) {
    return 700;
  }

  return 400;
};

const SIZES = {
  xsmall: 'FONT_XTRA_SMALL',
  small: 'FONT_SMALL',
  normal: 'FONT_NORMAL',
  medium: 'FONT_MEDIUM',
  large: 'FONT_LARGE',
};

const getFontSize = ({ size, theme: { LAYOUT } }) => LAYOUT[SIZES[size]] || LAYOUT[SIZES.normal];

export default styled.div`
  font-family: 'Open Sans', sans-serif !important;
  font-size: ${props => `${getFontSize(props)}px`};
  line-height: ${({ size, precise, theme }) =>
    precise ? 1 : `${getFontSize({ size, theme }) + (theme.LAYOUT.TEXT_PADDING * 2)}px`};
  font-weight: ${props => getFontWeight(props)};
  color: ${props => props.color || getColor(props)};
  text-align: ${({ align }) => align || 'left'};
`;
