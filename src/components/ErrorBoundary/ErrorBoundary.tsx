import React, { useState } from 'react';
import ErrorPage from './ErrorPage';

interface Props {
  children: React.ReactNode;
}

const ErrorBoundary = (props: Props) => {
  const [hasError, setHasError] = useState(false);

  const componentDidCatch = (error: Error, errorInfo: React.ErrorInfo) => {
    console.log(error, errorInfo);
    setHasError(true);
  };

  return(
  <>
  {hasError ? <ErrorPage /> : props.children}
  </>
  )
};

export default ErrorBoundary;
