import { contrastingColors } from 'variables/contrastingColors';
import { LineChartData, PeptideIntensityResponse } from './types';

export const parseLineChartData = (data: PeptideIntensityResponse) => {
  if (!data.peptides) return null;

  const parsedLineChartData: LineChartData = [];

  Object.keys(data.peptides).forEach((peptide, index) => {
    // @ts-ignore
    const intensities = data.peptides[peptide].intensities;

    const color = contrastingColors[index % contrastingColors.length];

    const line = { id: peptide, color, data: [] as { x: string; y: number }[] };

    const fwdIntensities = intensities.FWD;
    Object.keys(fwdIntensities).forEach((condition) => {
      line.data.push({
        x: `${condition} FWD`,
        y: fwdIntensities[condition],
      });
    });

    const revIntensities = intensities.REV;
    Object.keys(revIntensities).forEach((condition) => {
      line.data.push({
        x: `${condition} REV`,
        y: revIntensities[condition],
      });
    });

    parsedLineChartData.push(line);
  });

  return parsedLineChartData;
};
