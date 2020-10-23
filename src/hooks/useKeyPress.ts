import { useState, useEffect } from 'react';

const useKeyPress = (targetKey: string) => {
  const [keyPress, setKeyPress] = useState(false);
  const onKeyDownHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPress(true);
    }
  };
  const onKeyUpHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPress(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDownHandler);
    window.addEventListener('keyup', onKeyUpHandler);
    return () => {
      window.removeEventListener('keydown', onKeyDownHandler);
      window.removeEventListener('keyup', onKeyUpHandler);
    };
  }, []);
  return keyPress;
};

export default useKeyPress;
