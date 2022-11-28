import Link from 'next/link';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { INav } from '../component.interfaces';
import styles from './styles/Nav.module.css';

const MainNav: React.FC<INav> = ({ className }) => {
  const session = useSession();
  const isAdmin = session.data?.user?.roles?.includes('admin');

  return (
    <nav className={`${className} ${styles.mainNav}`}>
      {isAdmin && (
        <section>
          <h2>Admin</h2>
          <ul>
            <li>
              <Link
                href={{
                  pathname: '/dashboard',
                }}
                as={'dashboard/users'}
              >
                Manage users
              </Link>
            </li>
          </ul>
        </section>
      )}

      <section>
        <h2>Profile</h2>
        <ul>
          <li>
            <Link
              href={{
                pathname: '/dashboard',
              }}
              as={'dashboard/logs'}
            >
              Logs
            </Link>

            <ul>
              <li>2022</li>
              <li>2021</li>
              <li>2020</li>
            </ul>
          </li>
          <li>
            {' '}
            <Link
              href={{
                pathname: '/dashboard',
              }}
              as={'dashboard/logs/new'}
            >
              New log
            </Link>
          </li>
        </ul>
      </section>
      <section className={styles.logoutSection}>
        <button onClick={() => signOut({ callbackUrl: '/' })}>Log out</button>
      </section>
    </nav>
  );
};

export default MainNav;
