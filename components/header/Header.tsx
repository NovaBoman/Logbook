import React from 'react';
import { IHeader } from '../component.interfaces';
import styles from './styles/Header.module.css';

const user = { username: 'Novster', nr: '26947' };

const Header: React.FC<IHeader> = ({ heading, className }) => (
  <>
    <header className={`${className} ${styles.header}`}>
      <h1>{heading}</h1>
      <svg
        className={styles.icon}
        width="15"
        height="38"
        viewBox="0 0 56 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 5.22641L28.434 33"
          stroke={'#FFFCF5'}
          stroke-width="10"
          stroke-linecap="round"
        />
        <path
          d="M51 5.22641L28.434 33"
          stroke="#FFFCF5"
          stroke-width="10"
          stroke-linecap="round"
        />
      </svg>

      <div className={styles.userWrapper}>
        <p>{`#${user.nr}`}</p>
        <div className={styles.avatar}></div>
      </div>
    </header>
  </>
);
export default Header;
