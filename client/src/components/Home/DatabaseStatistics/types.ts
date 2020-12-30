import { HTMLAttributes } from 'react';

export interface StatisticProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
}
