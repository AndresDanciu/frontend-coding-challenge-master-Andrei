import React from 'react';
import {
  ErrorBoundary as ErrorBoundaryReact,
  FallbackProps,
} from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return <div>Error</div>;
}

type Props = {
  children: JSX.Element;
};

const ErrorBoundary: React.FC<Props> = ({ children }) => {
  const errorHandler = (error: Error) => {
    // Add analytics here
    console.error('ErrorBoundary detected', error);
    console.log(' detected', error);
  };

  return (
    <ErrorBoundaryReact
      FallbackComponent={ErrorFallback}
      onError={errorHandler}
    >
      {children}
    </ErrorBoundaryReact>
  );
};

export default ErrorBoundary;
