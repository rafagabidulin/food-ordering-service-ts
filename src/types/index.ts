import { ReactNode } from 'react';

export interface IButton {
  children: ReactNode;
  size: string;
  type: string;
  onClick: () => void;
  className: string;
}
