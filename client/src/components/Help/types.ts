import { HTMLAttributes } from 'react';

export interface QuestionCardProps extends HTMLAttributes<HTMLDivElement> {
  questionTitle: string;
  questionAnswer: string;
}
