import * as ReactDOMClient from 'react-dom/client';
import React from 'react';
import GlobalStyle from 'styles/GlobalStyle';
import { Provider } from 'react-redux';
import store from 'store';
import { Container } from 'styles';
import { ErrorBoundary, Header } from 'components';
import TournamentsManager from 'features/tournaments';
import styled from 'styled-components';

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function App() {
  return (
    <Container>
      <Header />
      <Wrapper>
        <ErrorBoundary>
          <TournamentsManager />
        </ErrorBoundary>
      </Wrapper>
    </Container>
  );
}

// eslint-disable-next-line unicorn/prefer-query-selector
const ROOT = document.getElementById('root') as HTMLElement;
if (!ROOT) {
  throw new Error('No container found');
}

ReactDOMClient.createRoot(ROOT).render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>
);
