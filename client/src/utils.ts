import axios from 'axios';

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

export const fetchFromApi = async (
  route: string,
  params?: {
    [key: string]: string | number | boolean;
  }
) => {
  try {
    const response = await axios.get(route, { params });
    return response.data;
  } catch (err) {
    return console.error(err);
  }
};

// export const useAsyncEffect = (func: any, onSuccess: (data: any) => void, dependencies: any[]) => {
//   useEffect(() => {
//     let isMounted = true;

//     func().then((data: any) => {
//       if (isMounted) onSuccess(data);
//     });

//     return () => {
//       isMounted = false;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [...dependencies]);
// };
