/* eslint-disable arrow-body-style */
import { useRouter } from 'next/router';
import React from 'react';
import { IMain } from '../component.interfaces';
import { useContentSwitch } from './useContentSwitch';

const DashboardMain: React.FC<IMain> = ({ className }) => {
  const router = useRouter();
  const url = router.asPath;

  // useContentSwitch returns a component depending on the current URL.
  return <main className={className}>{useContentSwitch(url)}</main>;
};

export default DashboardMain;
