import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Container, Separator } from '../index';
import Profile from '../profile/index';
import Users from '../users/index';
import Follow from '../follow/index';
import LAYOUT from '../../constants/layout';


const FixedAsideContainer = styled.div`
  position: fixed;
  top: 66px;
  left: 0;
  right: 0;
`;

const Aside = styled.aside`
width: calc(25% - 15px);
position: absolute;
`;
const AsideLeft = Aside.extend`
  left: 0px;
`;

const AsideRight = Aside.extend`
  right: 0px;
`;

const AsideWrapper = styled.div`
  position: relative;
`;


export default class AppAsside extends PureComponent {
  render() {
    return (
      <FixedAsideContainer>
        <Container>
          <AsideWrapper>
            <AsideLeft>
              <Profile />
              <Separator
                transparent
                height={LAYOUT.CARD_GAP}
              />
              <Users />
            </AsideLeft>
            <AsideRight>
              <Follow />
            </AsideRight>
          </AsideWrapper>
        </Container>
      </FixedAsideContainer>
    );
  }
}
