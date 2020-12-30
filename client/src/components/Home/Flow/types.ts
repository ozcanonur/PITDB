import { HTMLAttributes } from 'react';

export interface FlowShapeProps extends HTMLAttributes<HTMLDivElement> {
  children?: JSX.Element | string;
}
