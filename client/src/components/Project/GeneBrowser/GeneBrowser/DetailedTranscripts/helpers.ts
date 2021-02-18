export const findTranscriptPositionFromScrollValue = (
  scrollLeft: number,
  minimumPosition: number,
  maximumPosition: number,
  boxHeight: number
) => {
  const transcriptWidth = maximumPosition - minimumPosition + 1;
  const totalTranscriptWidthInPixels = transcriptWidth * boxHeight;
  const percentageScrolled = scrollLeft / totalTranscriptWidthInPixels;
  const currentTranscriptPosition = Math.floor(minimumPosition + transcriptWidth * percentageScrolled);

  return currentTranscriptPosition;
};

export const findScrollValueFromTranscriptPosition = (
  transcriptPosition: number,
  minimumPosition: number,
  maximumPosition: number,
  boxHeight: number
) => {
  const transcriptWidth = maximumPosition - minimumPosition + 1;
  const totalTranscriptWidthInPixels = transcriptWidth * boxHeight;
  const percentageScrolled = (transcriptPosition - minimumPosition) / transcriptWidth;
  const scrollLeft = percentageScrolled * totalTranscriptWidthInPixels;

  return scrollLeft;
};

export const parseDiscreteSliderMarks = (marks: string[]) =>
  marks.map((mark, index) => ({
    value: index,
    scaledValue: parseFloat(mark),
    label: mark,
  }));
