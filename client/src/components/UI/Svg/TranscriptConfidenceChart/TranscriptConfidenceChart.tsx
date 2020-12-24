import { ChartBase, ChartDefs } from './ChartBase';

const TranscriptConfidentChart = ({ ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 227.68 197.85'
      style={{ height: '27rem' }}
      {...props}
    >
      <defs>
        <ChartDefs />
      </defs>
      <g id='prefix__Layer_2' data-name='Layer 2'>
        <g id='prefix__Layer_1-2' data-name='Layer 1'>
          <g id='prefix__Confident_chart'>
            <ChartBase />
            <g id='prefix__Triangle' fill='#673f7e'>
              <path opacity={0.4} d='M185.9 107.51l-112.91 75H185.9v-75z' />
              <path strokeWidth={0.25} stroke='#673f7e' strokeMiterlimit={10} d='M73.09 182.48l112.81-33.07' />
            </g>
            <g id='prefix__Square'>
              <path fill='#99f' opacity={0.4} d='M73.01 147.18h112.87v35.33H73.01z' />
              <path stroke='#99f' strokeWidth={0.25} fill='#673f7e' strokeMiterlimit={10} d='M73.01 164.84h112.87' />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default TranscriptConfidentChart;
