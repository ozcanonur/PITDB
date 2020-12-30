import { HTMLAttributes } from 'react';

export interface ExampleProps extends HTMLAttributes<HTMLDivElement> {
  exampleProps: {
    id: string;
    species: string;
    TGEs: string;
    username: string;
    date: string;
    color: string;
  };
}
