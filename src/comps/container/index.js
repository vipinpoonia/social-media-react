import styled from 'styled-components';

export default styled.div`
  height: inherit;
  margin: 0 auto;
  max-width: 1128px;
  padding: 0 10px;
  position: relative;
  
  @media (min-width: 768px) {
    padding: 0 15px;
  }

  @media (min-width: 1024px) {
    padding: 0 30px;
  }

  @media (min-width: 1280px) {
    padding: 0 30px;
  }
`;
