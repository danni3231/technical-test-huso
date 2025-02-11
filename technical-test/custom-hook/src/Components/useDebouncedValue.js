import { useState, useEffect } from 'react';

const useDebouncedValue = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Create a timer to update the value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean the timer if the value or delay change
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Execute the effect if the value or delay changes

  return debouncedValue;
};

export default useDebouncedValue;