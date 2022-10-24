import styled from 'styled-components';
import theme from 'styles/theme';

const Container = styled.div`
  max-width: 960px;
  margin-top: ${theme.spacing(6)};
  margin-left: auto;
  margin-right: auto;
  @media (max-width: ${theme.breakpoints.l}) {
    margin: 1rem;
  }
`;

export default Container;
