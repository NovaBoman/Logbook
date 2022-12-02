import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import DashboardMain from '../components/main/DashboardMain';
import Header from '../components/header/Header';
import MainNav from '../components/navigation/MainNav';
import styles from '../styles/Dashboard.module.css';

const Dashboard: NextPage = () => {
  // Dashboard uses router.asPath as key for DashboardMain component
  // to rerender component on URL changes
  const router = useRouter();

  return (
    <>
      <Head>
        <title>SkyLog</title>
        <meta name="description" content="Logbook for skydivers" />
      </Head>
      <div className={styles.grid}>
        <Header className={styles.header} />
        <MainNav className={styles.nav} />
        <DashboardMain key={router.asPath} className={styles.main} />
        <footer className={styles.footer}></footer>
      </div>
    </>
  );
};
export default Dashboard;
