import axios from 'axios';

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

export const findAAFromCodon = (codon: string) => {
  switch (codon) {
    case 'TTT':
    case 'TTC':
      return 'F';
    case 'TTA':
    case 'TTG':
    case 'CTT':
    case 'CTC':
    case 'CTA':
    case 'CTG':
      return 'L';
    case 'ATT':
    case 'ATC':
    case 'ATA':
      return 'I';
    case 'ATG':
      return 'M';
    case 'GTT':
    case 'GTC':
    case 'GTA':
    case 'GTG':
      return 'V';
    case 'TCT':
    case 'TCC':
    case 'TCA':
    case 'TCG':
      return 'S';
    case 'CCT':
    case 'CCC':
    case 'CCA':
    case 'CCG':
      return 'P';
    case 'ACT':
    case 'ACC':
    case 'ACA':
    case 'ACG':
      return 'T';
    case 'GCT':
    case 'GCC':
    case 'GCA':
    case 'GCG':
      return 'A';
    case 'TAT':
    case 'TAC':
      return 'Y';
    case 'TAA':
    case 'TAG':
    case 'TGA':
      return '*';
    case 'CAT':
    case 'CAC':
      return 'H';
    case 'CAA':
    case 'CAG':
      return 'Q';
    case 'AAT':
    case 'AAC':
      return 'N';
    case 'AAA':
    case 'AAG':
      return 'K';
    case 'GAT':
    case 'GAC':
      return 'D';
    case 'GAA':
    case 'GAG':
      return 'E';
    case 'TGT':
    case 'TGC':
      return 'C';
    case 'TGG':
      return 'W';
    case 'CGT':
    case 'CGC':
    case 'CGA':
    case 'CGG':
    case 'AGA':
    case 'AGG':
      return 'R';
    case 'AGT':
    case 'AGC':
      return 'S';
    case 'GGT':
    case 'GGC':
    case 'GGA':
    case 'GGG':
      return 'G';
    default:
      return '';
  }
};
