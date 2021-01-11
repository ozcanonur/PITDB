import { HTMLAttributes } from 'react';

export interface GenericLegendProps extends HTMLAttributes<HTMLDivElement> {
  items: string[];
  colors: string[];
  direction?: 'horizontal' | 'vertical';
}
