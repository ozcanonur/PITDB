import axios from 'axios';

export const isStringArray = (test: any): boolean => {
  return Array.isArray(test) && !test.some((value) => typeof value !== 'string');
};

export const isNumberArray = (test: any[]): boolean => {
  return Array.isArray(test) && !test.some((value) => typeof value !== 'number');
};

export const isNumberTuple = (test: any[]): boolean => {
  if (!(test instanceof Array)) return false;

  const [first, second] = test;

  if (typeof first === 'number' && typeof second === 'number' && test.length === 2) {
    return true;
  }

  return false;
};

interface Params {
  [key: string]: string | number | boolean;
}

export const fetchFromApi = async (route: string, params?: Params, paramsSerializer?: any) => {
  try {
    const response = await axios.get(route, { params, paramsSerializer });
    return response.data;
  } catch (err) {
    return console.error(err);
  }
};
