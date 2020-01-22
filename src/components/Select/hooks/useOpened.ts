import * as React from 'react';

const useOpened = () => {
  const [opened, setOpened] = React.useState(false);

  const openSelect = React.useCallback(() => setOpened(true), []);
  const closeSelect = React.useCallback(() => setOpened(false), []);
  const toggleSelect = React.useCallback(
    () => setOpened(prevOpened => !prevOpened),
    []
  );

  return {
    opened,
    openSelect,
    closeSelect,
    toggleSelect
  };
};

export default useOpened;
