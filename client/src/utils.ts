// @ts-nocheck
import axios from 'axios';
import { useEffect, useRef } from 'react';

export const fetchFromApi = async (
  route: string,
  params?: {
    [key: string]: any;
  }
) => {
  try {
    const response = await axios.get(route, { params });
    return response.data;
  } catch (err) {
    return console.error(err);
  }
};

export const isStringArray = (test: any): boolean =>
  Array.isArray(test) && !test.some((value) => typeof value !== 'string');

export const isNumberArray = (test: any[]): boolean =>
  Array.isArray(test) && !test.some((value) => typeof value !== 'number');

export const isNumberTuple = (test: any[]): boolean => {
  if (!(test instanceof Array)) return false;

  const [first, second] = test;

  if (typeof first === 'number' && typeof second === 'number' && test.length === 2) {
    return true;
  }

  return false;
};

export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export const reverseString = (str: string) => str.split('').reverse().join('');

export function useWhyDidYouUpdate(name, props) {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      // Iterate through keys
      allKeys.forEach((key) => {
        // If previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });

      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj);
      }
    }

    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
}

export function allElementsFromPoint(x, y) {
  var element,
    elements = [];
  var old_visibility = [];
  while (true) {
    element = document.elementFromPoint(x, y);
    if (!element || element === document.documentElement) {
      break;
    }
    elements.push(element);
    old_visibility.push(element.style.visibility);
    element.style.visibility = 'hidden'; // Temporarily hide the element (without changing the layout)
  }
  for (var k = 0; k < elements.length; k++) {
    elements[k].style.visibility = old_visibility[k];
  }
  elements.reverse();
  return elements;
}
