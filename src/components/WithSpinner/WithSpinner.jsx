import React from 'react';
import { SpinnerContainer, SpinnerOverlay } from './WithSpinner.styles';

// HOC Example
const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
  const Spinner = isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  );

  return Spinner;
};

export default WithSpinner;
