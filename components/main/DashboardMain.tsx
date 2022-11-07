import React from 'react';
import { IMain } from '../component.interfaces';

const DashboardMain: React.FC<IMain> = ({ className }) => (
  <div className={className}>Main content</div>
);
export default DashboardMain;
