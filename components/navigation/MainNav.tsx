import React from 'react';
import { INav } from '../component.interfaces';
import styles from './styles/Nav.module.css';

const MainNav: React.FC<INav> = ({ className }) => (
  <nav className={`${className} ${styles.mainNav}`}>
    <section>
      <h2>Admin</h2>
      <ul>
        <li>Manage users</li>
      </ul>
    </section>

    <section>
      <h2>Profile</h2>
      <ul>
        <li>
          Logs
          <ul>
            <li>2022</li>
            <li>2021</li>
            <li>2020</li>
          </ul>
        </li>
        <li>New log</li>
      </ul>
    </section>
  </nav>
);

export default MainNav;
