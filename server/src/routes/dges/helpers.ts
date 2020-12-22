import { IDGE } from '../../db/models/dge';
import numeral from 'numeral';

export const parseValuesForVolcanoPlotAndFindMinMax = (dges: IDGE[]) => {
  const parsed = [
    {
      id: 'Decrease',
      data: [] as { x: number; y: number }[],
    },
    {
      id: 'Increase',
      data: [] as { x: number; y: number }[],
    },
  ];

  let fcMin = Number.MAX_VALUE;
  let fcMax = 0;
  let pMax = 0;

  dges.forEach((dge) => {
    const { log2fc, padj, symbol } = dge;

    const convertedLog2fc = Math.round((log2fc + Number.EPSILON) * 100) / 100;
    const convertedPadj = Math.round((-Math.log10(padj) + Number.EPSILON) * 100) / 100;

    if (convertedLog2fc < fcMin) fcMin = convertedLog2fc;
    else if (convertedLog2fc > fcMax) fcMax = convertedLog2fc;

    if (convertedPadj > pMax) pMax = convertedPadj;

    const scatterPoint = {
      symbol,
      x: convertedLog2fc,
      y: convertedPadj,
    };
    if (log2fc < 0) parsed[0].data.push(scatterPoint);
    else parsed[1].data.push(scatterPoint);
  });

  return { parsed, fcMin, fcMax, pMax };
};

export const parseDges = (dges: IDGE[]) => {
  // WOOP, hard coding peptide evidence
  const parsedDges = dges.map((dge) => {
    const { symbol, log2fc, padj } = dge;
    const formattedlog2fc = numeral(log2fc).format('0.000');
    const formattedpadj = numeral(padj).format('0.000e+0');
    return {
      symbol,
      log2fc: formattedlog2fc,
      padj: formattedpadj,
      hasPeptideEvidence: false,
    };
  });

  return parsedDges;
};

export const convertSortFieldNameForMongoose = (field: string) => {
  if (field === 'Symbol') return 'symbol';
  else if (field === 'Log2 fold change') return 'log2fc';
  else if (field === 'P value') return 'padj';
};
