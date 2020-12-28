import { useSelector } from 'react-redux';

import { ChartBase, ChartDefs } from './ChartBase';
import { makeChartValues, getConditionNames } from './helpers';
import { TranscriptConfidenceChartProps } from './types';
import { COLORS } from 'variables/transcriptViewerColors';

const CHART_HEIGHT = 183;

const CONDITION_ONE_X_POS = 73;
const CONDITION_TWO_X_POS = 185;

const TranscriptConfidentChart = ({ data, ...props }: TranscriptConfidenceChartProps) => {
  const chartValues = makeChartValues(data);

  const { transcript: selectedTranscript } = useSelector(
    (state: RootState) => state.selectedTranscriptViewerTranscript
  );

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 227.68 197.85'
      {...props}
    >
      <defs>
        <ChartDefs />
      </defs>
      <ChartBase conditionNames={getConditionNames(data)} />
      {chartValues.map(({ transcript, conditions }, index) => {
        const [lineStart, lineEnd] = conditions.map(({ avg }) => CHART_HEIGHT - avg * CHART_HEIGHT);

        // Intervals
        const [[firstStart, firstEnd], [secondStart, secondEnd]] = conditions.map(({ avg, ci }) => {
          const start = Math.min(CHART_HEIGHT, CHART_HEIGHT - (avg - ci) * CHART_HEIGHT);
          const end = Math.min(CHART_HEIGHT, CHART_HEIGHT - (avg + ci) * CHART_HEIGHT);
          return [start, end];
        });

        const points = `${CONDITION_ONE_X_POS}, ${firstStart} ${CONDITION_TWO_X_POS}, ${secondStart} ${CONDITION_TWO_X_POS}, ${secondEnd} ${CONDITION_ONE_X_POS}, ${firstEnd}`;

        return (
          <g key={transcript}>
            <line
              x1={CONDITION_ONE_X_POS}
              y1={lineStart}
              x2={CONDITION_TWO_X_POS}
              y2={lineEnd}
              stroke={COLORS[index]}
              strokeWidth={transcript === selectedTranscript ? 1.5 : 0.5}
              style={{ transition: 'all .2s' }}
            />
            <polygon
              points={points}
              fill={COLORS[index]}
              opacity={transcript === selectedTranscript ? 0.65 : 0.1}
              style={{ transition: 'all .2s' }}
            />
          </g>
        );
      })}
    </svg>
  );
};

export default TranscriptConfidentChart;
