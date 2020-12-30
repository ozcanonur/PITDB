import { SVGAttributes } from 'react';

export type EventResponse = {
  eventType: string;
  chr: string;
  positions: [number, number, number, number];
  direction: string;
};

export interface ExonSkippingSvgProps extends SVGAttributes<SVGElement> {
  eventData: any;
  className: string;
}
