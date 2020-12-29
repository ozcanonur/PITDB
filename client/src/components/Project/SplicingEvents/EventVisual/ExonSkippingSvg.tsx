const ExonSkippingSvg = ({ eventData, ...props }: { eventData: any; className: string }) => {
  const { chr, direction, eventType, positions } = eventData;

  const [pos1, pos2, pos3, pos4] = positions;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 798 231.94'
      {...props}
    >
      <defs>
        <linearGradient
          id='prefix__linear-gradient'
          x1={399.2}
          y1={231.94}
          x2={399.2}
          y2={87.95}
          gradientUnits='userSpaceOnUse'
        >
          <stop offset={0} stopColor='#336' />
          <stop offset={0.08} stopColor='#336' stopOpacity={0.9} />
          <stop offset={0.22} stopColor='#336' stopOpacity={0.78} />
          <stop offset={0.43} stopColor='#336' stopOpacity={0.72} />
          <stop offset={1} stopColor='#336' stopOpacity={0.7} />
        </linearGradient>
        <linearGradient
          id='prefix__linear-gradient-2'
          x1={798}
          y1={146.84}
          x2={604.46}
          y2={146.84}
          gradientUnits='userSpaceOnUse'
        >
          <stop offset={0} stopColor='#336' stopOpacity={0} />
          <stop offset={0.23} stopColor='#336' stopOpacity={0.25} />
          <stop offset={0.52} stopColor='#336' stopOpacity={0.5} />
          <stop offset={0.79} stopColor='#336' stopOpacity={0.65} />
          <stop offset={1} stopColor='#336' stopOpacity={0.7} />
        </linearGradient>
        <linearGradient
          id='prefix__linear-gradient-3'
          x1={0}
          y1={145.98}
          x2={194.5}
          y2={145.98}
          xlinkHref='#prefix__linear-gradient-2'
        />
        <style>
          {
            '.prefix__cls-1{opacity:.8}.prefix__cls-2,.prefix__cls-7{fill:#336}.prefix__cls-3{fill:none;stroke:#336;stroke-miterlimit:10;stroke-width:4px}.prefix__cls-7{font-size:20px;font-family:Poppins-Regular,Poppins}'
          }
        </style>
      </defs>
      <g id='prefix__Layer_2' data-name='Layer 2'>
        <g id='prefix__Layer_1-2' data-name='Layer 1'>
          {direction === '-' ? (
            <g className='prefix__cls-1'>
              <path className='prefix__cls-2' d='M246 31.98h298' />
              <path className='prefix__cls-3' d='M262.72 31.98H544' />
              <path
                className='prefix__cls-2'
                d='M270.58 42.35l-4.41-10.37 4.41-10.37L246 31.98l24.58 10.37z'
              />
            </g>
          ) : (
            <g className='prefix__cls-1'>
              <path className='prefix__cls-2' d='M544 31.98H246' />
              <path className='prefix__cls-3' d='M527.28 31.98H246' />
              <path
                className='prefix__cls-2'
                d='M519.42 21.61l4.41 10.37-4.41 10.37L544 31.98l-24.58-10.37z'
              />
            </g>
          )}
          <path
            d='M199.49 126zM603.4 89l-107.9 37h-191L194 88l.55 38v40h3l200.72 65.71.76.25 204.77-64.07.71-.17V126zm-4.9 37v38.29L399 226.69l-199.5-65.37V127l-2.5-1h2.49l-.44-31 100.45 34.76V166h199v-35.41L598.6 96zm-399 0z'
            fill='url(#prefix__linear-gradient)'
          />
          <path fill='url(#prefix__linear-gradient-2)' d='M798 125.98v40H611.5l-7.04 1.72v-41.72H798z' />
          <path fill='url(#prefix__linear-gradient-3)' d='M0 125.98h194.5v40H0z' />
          <text className='prefix__cls-7' transform='translate(356.5 16.98)'>
            {`${eventType}, ${chr}`}
          </text>
          <text className='prefix__cls-7' transform='translate(99.5 196.98)'>
            {pos1}
          </text>
          <text className='prefix__cls-7' transform='translate(272.5 109.98)'>
            {pos2}
          </text>

          <text className='prefix__cls-7' transform='translate(416.56 110.14)'>
            {pos3}
          </text>
          <text className='prefix__cls-7' transform='translate(588.5 196.98)'>
            {pos4}
          </text>

          <path fill='none' d='M604.46 167.98v-.28' />
        </g>
      </g>
    </svg>
  );
};

export default ExonSkippingSvg;
