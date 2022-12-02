/* eslint-disable no-unneeded-ternary */
import { useSession } from 'next-auth/react';
import React from 'react';
import { IHeader } from '../component.interfaces';
import styles from './styles/Header.module.css';

const Header: React.FC<IHeader> = ({ className }) => {
  const username = useSession().data?.user.name;
  return (
    <>
      <header className={`${className} ${styles.header}`}>
        <div className={styles.userWrapper}>
          <div className={styles.avatar}></div>
          <h1>{username}</h1>
        </div>
      </header>
    </>
  );
};

export default Header;
