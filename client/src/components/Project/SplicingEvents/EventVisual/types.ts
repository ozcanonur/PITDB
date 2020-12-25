export type EventResponse = {
  eventType: string;
  chr: string;
  positions: [number, number, number, number];
  direction: string;
};
