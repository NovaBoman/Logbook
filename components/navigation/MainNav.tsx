import React from 'react';
import { IGridElement } from '../component.interfaces';

const MainNav: React.FC<IGridElement> = ({ className }) => (
  <nav className={className}>Nav</nav>
);

export default MainNav;
