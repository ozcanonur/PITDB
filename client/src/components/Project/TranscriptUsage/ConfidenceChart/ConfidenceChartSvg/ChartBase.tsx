import { ChartBaseProps } from './types';

const ChartBase = ({ conditionNames, ...props }: ChartBaseProps) => {
  return (
    <>
      <defs>
        <linearGradient
          id='prefix__linear-gradient'
          x1={31.68}
          y1={20.66}
          x2={227.68}
          y2={20.66}
          gradientUnits='userSpaceOnUse'
        >
          <stop offset={0} stopColor='#bbb' />
          <stop offset={0.03} stopColor='#bbb' />
          <stop offset={0.21} stopColor='#bbb' />
          <stop offset={0.25} stopColor='#c4c4c4' />
          <stop offset={0.36} stopColor='#d7d7d7' />
          <stop offset={0.49} stopColor='#e4e4e4' />
          <stop offset={0.66} stopColor='#ececec' />
          <stop offset={1} stopColor='#eee' />
        </linearGradient>
        <style>
          {
            '.prefix__cls-11{font-size:9px;fill:#336;font-family:Poppins, sans-serif}.prefix__cls-12{letter-spacing:-.01em}'
          }
        </style>
      </defs>
      <g id='prefix__Graph_base' {...props}>
        <path
          fill='url(#prefix__linear-gradient)'
          stroke='url(#prefix__linear-gradient)'
          strokeMiterlimit={10}
          d='M30 4.34h350'
        />
        <path
          fill='url(#prefix__linear-gradient)'
          stroke='url(#prefix__linear-gradient)'
          strokeMiterlimit={10}
          d='M30 20.66h350'
        />
        <path
          fill='url(#prefix__linear-gradient)'
          stroke='url(#prefix__linear-gradient)'
          strokeMiterlimit={10}
          d='M30 39.18h350'
        />
        <path
          fill='url(#prefix__linear-gradient)'
          stroke='url(#prefix__linear-gradient)'
          strokeMiterlimit={10}
          d='M30 57.18h350'
        />
        <path
          fill='url(#prefix__linear-gradient)'
          stroke='url(#prefix__linear-gradient)'
          strokeMiterlimit={10}
          d='M30 75.18h350'
        />
        <path
          fill='url(#prefix__linear-gradient)'
          stroke='url(#prefix__linear-gradient)'
          strokeMiterlimit={10}
          d='M30 93.18h350'
        />
        <path
          fill='url(#prefix__linear-gradient)'
          stroke='url(#prefix__linear-gradient)'
          strokeMiterlimit={10}
          d='M30 111.18h350'
        />
        <path
          fill='url(#prefix__linear-gradient)'
          stroke='url(#prefix__linear-gradient)'
          strokeMiterlimit={10}
          d='M30 129.18h350'
        />
        <path
          fill='url(#prefix__linear-gradient)'
          stroke='url(#prefix__linear-gradient)'
          strokeMiterlimit={10}
          d='M30 147.18h350'
        />
        <path
          fill='url(#prefix__linear-gradient)'
          stroke='url(#prefix__linear-gradient)'
          strokeMiterlimit={10}
          d='M30 165.18h350'
        />
        <path
          fill='url(#prefix__linear-gradient)'
          stroke='url(#prefix__linear-gradient)'
          strokeMiterlimit={10}
          d='M30 183.51h350'
        />
        <text className='prefix__cls-11' transform='translate(20.9 185.41)'>
          {'0'}
        </text>
        <text className='prefix__cls-11' transform='translate(18.68 167.85)'>
          {'10'}
        </text>
        <text className='prefix__cls-11' transform='translate(16.68 149.52)'>
          {'20'}
        </text>
        <text className='prefix__cls-11' transform='translate(16.68 131.69)'>
          {'30'}
        </text>
        <text className='prefix__cls-11' transform='translate(16.68 113.69)'>
          {'40'}
        </text>
        <text className='prefix__cls-11' transform='translate(16.68 95.91)'>
          {'50'}
        </text>
        <text className='prefix__cls-11' transform='translate(16.68 77.91)'>
          {'60'}
        </text>
        <text className='prefix__cls-11' transform='translate(16.68 59.91)'>
          {'70'}
        </text>
        <text className='prefix__cls-11' transform='translate(16.68 42.13)'>
          {'80'}
        </text>
        <text className='prefix__cls-11' transform='translate(16.68 23.01)'>
          {'90'}
        </text>
        <text className='prefix__cls-11' transform='translate(13.94 6.7)'>
          {'100'}
        </text>
        <path stroke='#d9d9d9' fill='#bbb' strokeMiterlimit={10} d='M109 189.24l.04-5.55' />
        <path stroke='#eee' fill='#bbb' strokeMiterlimit={10} d='M268 189.24l.04-5.55' />
        <text className='prefix__cls-11' transform='rotate(-89.36 53.497 46.202) translate(-30, 0)'>
          <tspan className='prefix__cls-12'>{'Transcript Usage %'}</tspan>
        </text>
        {/* <text className='prefix__cls-11' transform='translate(150 198.85)'>
        <tspan className='prefix__cls-12'>{'Conditions'}</tspan>
      </text> */}
        <text className='prefix__cls-11' transform='translate(102 200)'>
          {conditionNames[0]}
        </text>
        <text className='prefix__cls-11' transform='translate(264 200)'>
          {conditionNames[1]}
        </text>
      </g>
    </>
  );
};

export default ChartBase;
