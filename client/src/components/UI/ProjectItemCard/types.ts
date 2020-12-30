import { HTMLAttributes } from 'react';

export interface ProjectItemCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  children: JSX.Element | JSX.Element[];
}
