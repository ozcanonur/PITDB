import { HTMLAttributes, SVGAttributes } from 'react';

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  svgProps?: SVGAttributes<SVGElement>;
}
