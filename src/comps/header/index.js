import React, { PureComponent } from 'react';
import styled from 'styled-components';
import logo from '../../img/logo.svg';
import Container from '../container/index';
import { Col, Row, Text } from '../index';

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 46px;
  background: #FFFFFF;
  box-shadow: 4px 6px 8px 0 rgba(0, 0, 0, 0.03);
  z-index: 29;
  border-bottom: 1px solid #ddd;
`;
const Logo = styled.img`
  height: 40px;
  display: block;
`;

export default class AppHeader extends PureComponent {
  render() {
    return (
      <Header>
        <Container>
          <Row alignItems="center" justifyContent="center" inherit>
            <Col>
              <a className="logo" href="/">
                <Logo src={logo} alt="demo logo" />
              </a>
            </Col>
            <Col>
              <Text size="large">Demo App</Text>
            </Col>
          </Row>
        </Container>
      </Header>
    );
  }
}
