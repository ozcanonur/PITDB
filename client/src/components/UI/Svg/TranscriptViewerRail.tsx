interface Props {
  transcriptData: {
    transcript: {
      transcriptId: string;
      exons?: { start: number; end: number }[];
    };
    minimumPosition: number;
    maximumPosition: number;
  };
  className: string;
}

const RAIL_OFFSET = 153;
const RAIL_LENGTH = 494;

const TranscriptViewerRail = ({ transcriptData, className, ...props }: Props) => {
  const { transcript, minimumPosition, maximumPosition } = transcriptData;
  const { transcriptId, exons } = transcript;

  const increment = RAIL_LENGTH / (maximumPosition - minimumPosition);

  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 647 21.79' {...props} className={className}>
      <defs>
        <style>{'.prefix__cls-2{fill:#336}.prefix__cls-3{opacity:.7}'}</style>
      </defs>
      <g id='prefix__Layer_2' data-name='Layer 2'>
        <g id='prefix__Layer_1-2' data-name='Layer 1'>
          {/* This is the rail */}
          <g opacity={0.5}>
            <path className='prefix__cls-2' d='M153 9h494' />
            <rect className='prefix__cls-2' x={RAIL_OFFSET} y={8} width={RAIL_LENGTH} height={2} rx={0.5} />
          </g>
          {/* These are the boxes */}
          {exons?.map(({ start, end }) => {
            const exonStartingPosition = RAIL_OFFSET + increment * (start - minimumPosition);
            const exonWidth = increment * (end - start);
            return (
              <g key={String(start + end)} className='prefix__cls-3'>
                <rect className='prefix__cls-2' x={exonStartingPosition} width={exonWidth} height={17} rx={1} />
              </g>
            );
          })}
          <text
            transform='translate(0 12.99)'
            fontSize='1.2rem'
            fontFamily='Poppins, sans-serif'
            color='#336'
            fill='#336'
          >
            {transcriptId}
          </text>
        </g>
      </g>
    </svg>
  );
};

export default TranscriptViewerRail;
