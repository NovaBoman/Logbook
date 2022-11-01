import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Dashboard.module.css';

const Dashboard: NextPage = () => (
  
    <Head>
      <title>SkyLog</title>
      <meta name="description" content="Logbook for skydivers" />
    </Head>
    <main className={styles.main}>
      <div className="container">
        <h1>Welcome to dashboard!</h1>
      </div>
    </main>
  
);

export default Dashboard;
