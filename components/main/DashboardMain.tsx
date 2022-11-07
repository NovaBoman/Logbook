import React from 'react';
import { IMain } from '../component.interfaces';
import UserList from '../users/UserList';

const DashboardMain: React.FC<IMain> = ({ className }) => (
  <div className={className}>
    <UserList />
  </div>
);
export default DashboardMain;
