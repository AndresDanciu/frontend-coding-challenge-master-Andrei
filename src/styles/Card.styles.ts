import styled from 'styled-components';
import theme from 'styles/theme';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: ${theme.palette.background.base};
  border-radius: ${theme.borderRadius};
  padding: 1em;
`;

export default Card;
