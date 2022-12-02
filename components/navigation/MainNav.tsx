import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
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
            <li>
              <Link
                href={{
                  pathname: '/dashboard',
                }}
                as={'dashboard/users'}
              >
                Create user
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
        <Image
          alt="Log out"
          width="20"
          height="20"
          src="/icons/logout.svg"
        ></Image>
        <button
          className={styles.logoutButton}
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          Log out
        </button>
      </section>
    </nav>
  );
};

export default MainNav;
