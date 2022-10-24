import React from 'react';
import { Button, H6 } from 'styles';

interface Props {
  message: string;
  onRetry: () => void;
}

function ErrorGeneric({ message = 'Something went wrong', onRetry }: Props) {
  return (
    <>
      <H6>{message}</H6>
      <Button onClick={onRetry}>Retry</Button>
    </>
  );
}

export default ErrorGeneric;
