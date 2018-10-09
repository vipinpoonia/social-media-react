import styled, { css } from 'styled-components';
import LAYOUT from '../../constants/layout';
import COLORS from '../../constants/colors';

const getGapSize = (gap) => {
  if (typeof gap === 'boolean') {
    return `${LAYOUT.GAP}px`;
  }

  return `${Number.isFinite(gap) ? gap + 0 : 0}px`;
};

const getGutterSize = (gutter) => {
  if (typeof gutter === 'boolean') {
    return `${LAYOUT.GUTTER}px`;
  }

  return `${Number.isFinite(gutter) ? gutter + 0 : 0}px`;
};

export const FlexView = styled.div`
  display: flex;
  flex-direction: column;
  ${({ inherit }) => inherit && css`
    height: inherit;
  `};
  padding-top: ${({ gap }) => getGapSize(gap)};
  padding-bottom: ${({ gap }) => getGapSize(gap)};
  padding-left: ${({ gutter }) => getGutterSize(gutter)};
  padding-right: ${({ gutter }) => getGutterSize(gutter)};
  ${({ alignItems }) => alignItems && css`
    align-items: ${alignItems};
  `};
  ${({ justifyContent }) => justifyContent && css`
    justify-content: ${justifyContent};
  `};
`;

export const FlexRow = FlexView.extend`
  flex-direction: row;
  ${({ flexWrap }) => flexWrap && css`
    flex-wrap: wrap;
  `};
`;

export const Col = styled.div`
  ${({ auto }) => auto && css`
    flex: 1;
  `};
  ${({ autoRight }) => autoRight && css`
    margin-left: auto;
  `};
  padding-left: ${({ gutter }) => `${Number.isFinite(gutter) ? gutter : LAYOUT.GUTTER / 2}px`};
  padding-right: ${({ gutter }) => `${Number.isFinite(gutter) ? gutter : LAYOUT.GUTTER / 2}px`};
  padding-top: ${({ gap }) => getGapSize(gap)};
  padding-bottom: ${({ gap }) => getGapSize(gap)};
`;

export const Row = FlexRow.extend`
  & > ${Col}:first-child {
    padding-left: 0;
  }

  & > ${Col}:last-child {
    padding-right: 0;
  }
`;

const getBackgroundColor = ({ secondary }) => {
  if (secondary) {
    return COLORS.LIGHT_BLUE;
  }

  return COLORS.WHITE;
};

export const FlexCard = FlexView.extend`
  background-color: ${props => props.backgroundColor || getBackgroundColor(props)};;
  border-radius: 0px;
  ${({ shadow }) => (!shadow && shadow !== false) && css`
    box-shadow: 0 0 1px 0 rgba(33, 92, 91, 0.31);
  `};
  ${({ cover }) => cover && css`
    height: 100%;
  `};
`;


export const Card = FlexCard.extend`
  display: block;
`;
