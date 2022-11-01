import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Dashboard.module.css';

const Dashboard: NextPage = () => (
  <>
    <Head>
      <title>SkyLog</title>
      <meta name="description" content="Logbook for skydivers" />
    </Head>
    <div className={styles.grid}>
      <header className={styles.header}>Header</header>
      <nav className={styles.nav}>Nav</nav>
      <main className={styles.main}>Main</main>
      <footer className={styles.footer}>Footer</footer>
    </div>
  </>
);

export default Dashboard;
