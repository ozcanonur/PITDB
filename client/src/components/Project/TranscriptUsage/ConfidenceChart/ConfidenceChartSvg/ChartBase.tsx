import { ChartBaseProps } from './types';

export const ChartBase = ({ conditionNames, ...props }: ChartBaseProps) => {
  return (
    <g id='prefix__Graph_base' {...props}>
      <path
        fill='url(#prefix__linear-gradient-21)'
        stroke='url(#prefix__linear-gradient-22)'
        strokeMiterlimit={10}
        d='M30 4.34h350'
      />
      <path
        fill='url(#prefix__linear-gradient)'
        stroke='url(#prefix__linear-gradient-2)'
        strokeMiterlimit={10}
        d='M30 20.66h350'
      />
      <path
        fill='url(#prefix__linear-gradient-3)'
        stroke='url(#prefix__linear-gradient-4)'
        strokeMiterlimit={10}
        d='M30 39.18h350'
      />
      <path
        fill='url(#prefix__linear-gradient-5)'
        stroke='url(#prefix__linear-gradient-6)'
        strokeMiterlimit={10}
        d='M30 57.18h350'
      />
      <path
        fill='url(#prefix__linear-gradient-7)'
        stroke='url(#prefix__linear-gradient-8)'
        strokeMiterlimit={10}
        d='M30 75.18h350'
      />
      <path
        fill='url(#prefix__linear-gradient-9)'
        stroke='url(#prefix__linear-gradient-10)'
        strokeMiterlimit={10}
        d='M30 93.18h350'
      />
      <path
        fill='url(#prefix__linear-gradient-11)'
        stroke='url(#prefix__linear-gradient-12)'
        strokeMiterlimit={10}
        d='M30 111.18h350'
      />
      <path
        fill='url(#prefix__linear-gradient-13)'
        stroke='url(#prefix__linear-gradient-14)'
        strokeMiterlimit={10}
        d='M30 129.18h350'
      />
      <path
        fill='url(#prefix__linear-gradient-15)'
        stroke='url(#prefix__linear-gradient-16)'
        strokeMiterlimit={10}
        d='M30 147.18h350'
      />
      <path
        fill='url(#prefix__linear-gradient-17)'
        stroke='url(#prefix__linear-gradient-18)'
        strokeMiterlimit={10}
        d='M30 165.18h350'
      />
      <path
        fill='url(#prefix__linear-gradient-19)'
        stroke='url(#prefix__linear-gradient-20)'
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
    </g>
  );
};

export const ChartDefs = () => {
  return (
    <>
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
      <linearGradient
        id='prefix__linear-gradient-2'
        x1={31.68}
        y1={20.66}
        x2={227.68}
        y2={20.66}
        gradientUnits='userSpaceOnUse'
      >
        <stop offset={0} stopColor='#bbb' />
        <stop offset={0.01} stopColor='#bbb' />
        <stop offset={0.06} stopColor='#bbb' />
        <stop offset={0.12} stopColor='#c9c9c9' />
        <stop offset={0.22} stopColor='#dadada' />
        <stop offset={0.34} stopColor='#e5e5e5' />
        <stop offset={0.52} stopColor='#ececec' />
        <stop offset={1} stopColor='#eee' />
      </linearGradient>
      <linearGradient
        id='prefix__linear-gradient-3'
        x1={31.68}
        y1={39.18}
        x2={227.68}
        y2={39.18}
        xlinkHref='#prefix__linear-gradient'
      />
      <linearGradient
        id='prefix__linear-gradient-4'
        x1={31.68}
        y1={39.18}
        x2={227.68}
        y2={39.18}
        xlinkHref='#prefix__linear-gradient-2'
      />
      <linearGradient
        id='prefix__linear-gradient-5'
        x1={31.68}
        y1={57.18}
        x2={227.68}
        y2={57.18}
        xlinkHref='#prefix__linear-gradient'
      />
      <linearGradient
        id='prefix__linear-gradient-6'
        x1={31.68}
        y1={57.18}
        x2={227.68}
        y2={57.18}
        xlinkHref='#prefix__linear-gradient-2'
      />
      <linearGradient
        id='prefix__linear-gradient-7'
        x1={31.68}
        y1={75.18}
        x2={227.68}
        y2={75.18}
        xlinkHref='#prefix__linear-gradient'
      />
      <linearGradient
        id='prefix__linear-gradient-8'
        x1={31.68}
        y1={75.18}
        x2={227.68}
        y2={75.18}
        xlinkHref='#prefix__linear-gradient-2'
      />
      <linearGradient
        id='prefix__linear-gradient-9'
        x1={31.68}
        y1={93.18}
        x2={227.68}
        y2={93.18}
        xlinkHref='#prefix__linear-gradient'
      />
      <linearGradient
        id='prefix__linear-gradient-10'
        x1={31.68}
        y1={93.18}
        x2={227.68}
        y2={93.18}
        xlinkHref='#prefix__linear-gradient-2'
      />
      <linearGradient
        id='prefix__linear-gradient-11'
        x1={31.68}
        y1={111.18}
        x2={227.68}
        y2={111.18}
        xlinkHref='#prefix__linear-gradient'
      />
      <linearGradient
        id='prefix__linear-gradient-12'
        x1={31.68}
        y1={111.18}
        x2={227.68}
        y2={111.18}
        xlinkHref='#prefix__linear-gradient-2'
      />
      <linearGradient
        id='prefix__linear-gradient-13'
        x1={31.68}
        y1={129.18}
        x2={227.68}
        y2={129.18}
        xlinkHref='#prefix__linear-gradient'
      />
      <linearGradient
        id='prefix__linear-gradient-14'
        x1={31.68}
        y1={129.18}
        x2={227.68}
        y2={129.18}
        xlinkHref='#prefix__linear-gradient-2'
      />
      <linearGradient
        id='prefix__linear-gradient-15'
        x1={31.68}
        y1={147.18}
        x2={227.68}
        y2={147.18}
        xlinkHref='#prefix__linear-gradient'
      />
      <linearGradient
        id='prefix__linear-gradient-16'
        x1={31.68}
        y1={147.18}
        x2={227.68}
        y2={147.18}
        xlinkHref='#prefix__linear-gradient-2'
      />
      <linearGradient
        id='prefix__linear-gradient-17'
        x1={31.68}
        y1={165.18}
        x2={227.68}
        y2={165.18}
        xlinkHref='#prefix__linear-gradient'
      />
      <linearGradient
        id='prefix__linear-gradient-18'
        x1={31.68}
        y1={165.18}
        x2={227.68}
        y2={165.18}
        xlinkHref='#prefix__linear-gradient-2'
      />
      <linearGradient
        id='prefix__linear-gradient-19'
        x1={31.68}
        y1={183.51}
        x2={227.68}
        y2={183.51}
        xlinkHref='#prefix__linear-gradient'
      />
      <linearGradient
        id='prefix__linear-gradient-20'
        x1={31.68}
        y1={183.51}
        x2={227.68}
        y2={183.51}
        xlinkHref='#prefix__linear-gradient-2'
      />
      <linearGradient
        id='prefix__linear-gradient-21'
        x1={31.68}
        y1={4.34}
        x2={227.68}
        y2={4.34}
        xlinkHref='#prefix__linear-gradient'
      />
      <linearGradient
        id='prefix__linear-gradient-22'
        x1={31.68}
        y1={4.34}
        x2={227.68}
        y2={4.34}
        xlinkHref='#prefix__linear-gradient-2'
      />
      <style>
        {
          '.prefix__cls-11{font-size:9px;fill:#336;font-family:Poppins, sans-serif}.prefix__cls-12{letter-spacing:-.01em}'
        }
      </style>
    </>
  );
};
