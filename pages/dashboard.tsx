import type { NextPage } from 'next';
import Head from 'next/head';
import DashboardMain from '../components/main/DashboardMain';
import Header from '../components/header/Header';
import MainNav from '../components/navigation/MainNav';
import styles from '../styles/Dashboard.module.css';

const Dashboard: NextPage = () => (
  <>
    <Head>
      <title>SkyLog</title>
      <meta name="description" content="Logbook for skydivers" />
    </Head>
    <div className={styles.grid}>
      <Header className={styles.header} heading={'Dashboard'} />
      <MainNav className={styles.nav} />
      <DashboardMain className={styles.main} />
      <footer className={styles.footer}></footer>
    </div>
  </>
);

export default Dashboard;
