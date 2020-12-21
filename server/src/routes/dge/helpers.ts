export const parseReadCount = (counts: {
  [condition: string]: {
    [sample: string]: number;
  };
}) => {
  const parsedCounts: { [condition: string]: number[] } = {};
  Object.keys(counts).forEach((condition) => {
    Object.keys(counts[condition]).forEach((sample) => {
      if (!parsedCounts[condition]) parsedCounts[condition] = [];
      parsedCounts[condition].push(counts[condition][sample]);
    });
  });

  return parsedCounts;
};
