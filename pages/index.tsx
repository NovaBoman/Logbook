import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const [message, setMessage] = useState('');
  const session = useSession();
  const router = useRouter();

  if (session.status === 'authenticated') {
    router.push('/dashboard');
    return <></>;
  }

  return (
    <>
      <Head>
        <title>SkyLog</title>
        <meta name="description" content="Logbook for skydivers" />
      </Head>

      <main className={styles.main}>
        <div className="logo-container">
          <svg
            className={styles.logo}
            viewBox="0 0 221 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.2592 16.2593V43L-1.14441e-05 31.7407V5H0H26.7407L38 16.2593L11.2592 16.2593Z"
              fill="url(#paint0_linear_106_197)"
            />
            <path
              d="M59.6747 43.48C57.6267 43.48 55.7227 43.192 53.9627 42.616C52.2347 42.008 50.7307 41.16 49.4507 40.072C48.1707 38.984 47.1947 37.72 46.5227 36.28C46.2667 35.768 46.2507 35.304 46.4747 34.888C46.7307 34.44 47.1467 34.136 47.7227 33.976C48.1707 33.848 48.6027 33.896 49.0187 34.12C49.4667 34.344 49.8027 34.68 50.0267 35.128C50.5067 36.056 51.2107 36.888 52.1387 37.624C53.0667 38.36 54.1707 38.936 55.4507 39.352C56.7307 39.736 58.1387 39.928 59.6747 39.928C61.3707 39.928 62.8747 39.656 64.1867 39.112C65.4987 38.536 66.5227 37.72 67.2587 36.664C68.0267 35.576 68.4107 34.264 68.4107 32.728C68.4107 30.776 67.6907 29.096 66.2507 27.688C64.8107 26.28 62.5547 25.384 59.4827 25C55.7387 24.552 52.8107 23.4 50.6987 21.544C48.5867 19.656 47.5307 17.352 47.5307 14.632C47.5307 12.68 48.0427 10.984 49.0667 9.544C50.1227 8.104 51.5627 7 53.3867 6.232C55.2107 5.432 57.3067 5.032 59.6747 5.032C61.4347 5.032 63.0347 5.32 64.4747 5.896C65.9147 6.44 67.1627 7.176 68.2187 8.104C69.3067 9 70.1867 9.992 70.8587 11.08C71.1787 11.592 71.2747 12.088 71.1467 12.568C71.0507 13.048 70.7787 13.416 70.3307 13.672C69.8507 13.896 69.3547 13.928 68.8427 13.768C68.3627 13.608 67.9947 13.304 67.7387 12.856C67.2587 12.12 66.6507 11.432 65.9147 10.792C65.2107 10.12 64.3467 9.592 63.3227 9.208C62.2987 8.824 61.0667 8.616 59.6267 8.584C57.0987 8.584 55.0667 9.128 53.5307 10.216C51.9947 11.272 51.2267 12.824 51.2267 14.872C51.2267 15.96 51.5147 16.968 52.0907 17.896C52.6667 18.792 53.6107 19.576 54.9227 20.248C56.2667 20.888 58.0587 21.368 60.2987 21.688C64.2987 22.264 67.2587 23.496 69.1787 25.384C71.1307 27.24 72.1067 29.672 72.1067 32.68C72.1067 34.408 71.7867 35.944 71.1467 37.288C70.5387 38.632 69.6587 39.768 68.5067 40.696C67.3867 41.592 66.0587 42.28 64.5227 42.76C63.0187 43.24 61.4027 43.48 59.6747 43.48ZM81.7599 34.216L79.5039 31.768L95.9199 16.936C96.3039 16.584 96.7039 16.424 97.1199 16.456C97.5359 16.456 97.9199 16.648 98.2719 17.032C98.6239 17.416 98.7839 17.832 98.7519 18.28C98.7519 18.696 98.5599 19.064 98.1759 19.384L81.7599 34.216ZM80.5599 43C80.0159 43 79.5679 42.84 79.2159 42.52C78.8959 42.168 78.7359 41.72 78.7359 41.176V7.336C78.7359 6.792 78.8959 6.36 79.2159 6.04C79.5679 5.688 80.0159 5.512 80.5599 5.512C81.1039 5.512 81.5359 5.688 81.8559 6.04C82.2079 6.36 82.3839 6.792 82.3839 7.336V41.176C82.3839 41.72 82.2079 42.168 81.8559 42.52C81.5359 42.84 81.1039 43 80.5599 43ZM98.3199 42.76C97.9039 43.112 97.4719 43.256 97.0239 43.192C96.5759 43.16 96.1919 42.936 95.8719 42.52L85.1679 29.368L87.7599 27.064L98.5599 40.36C98.8799 40.744 99.0239 41.16 98.9919 41.608C98.9599 42.024 98.7359 42.408 98.3199 42.76ZM109.997 54.424C109.741 54.424 109.453 54.36 109.133 54.232C108.045 53.752 107.741 52.984 108.221 51.928L123.725 17.752C124.205 16.728 124.973 16.44 126.029 16.888C127.117 17.336 127.421 18.088 126.941 19.144L111.389 53.32C111.069 54.056 110.605 54.424 109.997 54.424ZM115.325 42.184C114.845 42.408 114.397 42.456 113.981 42.328C113.565 42.168 113.229 41.848 112.973 41.368L102.269 19.192C102.045 18.712 102.013 18.264 102.173 17.848C102.333 17.432 102.653 17.112 103.133 16.888C103.613 16.664 104.061 16.632 104.477 16.792C104.893 16.92 105.213 17.224 105.437 17.704L115.949 39.88C116.205 40.36 116.285 40.808 116.189 41.224C116.093 41.64 115.805 41.96 115.325 42.184ZM133.414 43C132.902 43 132.454 42.824 132.07 42.472C131.718 42.12 131.542 41.672 131.542 41.128V7.384C131.542 6.872 131.718 6.44 132.07 6.088C132.454 5.704 132.902 5.512 133.414 5.512C133.926 5.512 134.358 5.704 134.71 6.088C135.094 6.44 135.286 6.872 135.286 7.384V39.448H154.054C154.566 39.448 154.998 39.624 155.35 39.976C155.734 40.296 155.926 40.712 155.926 41.224C155.926 41.736 155.734 42.168 155.35 42.52C154.998 42.84 154.566 43 154.054 43H133.414ZM172.669 43.24C170.109 43.24 167.821 42.664 165.805 41.512C163.789 40.36 162.205 38.776 161.053 36.76C159.901 34.744 159.325 32.456 159.325 29.896C159.325 27.304 159.901 25 161.053 22.984C162.205 20.968 163.789 19.384 165.805 18.232C167.821 17.08 170.109 16.504 172.669 16.504C175.229 16.504 177.501 17.08 179.485 18.232C181.501 19.384 183.085 20.968 184.237 22.984C185.389 25 185.981 27.304 186.013 29.896C186.013 32.456 185.421 34.744 184.237 36.76C183.085 38.776 181.501 40.36 179.485 41.512C177.501 42.664 175.229 43.24 172.669 43.24ZM172.669 39.88C174.525 39.88 176.189 39.448 177.661 38.584C179.133 37.72 180.285 36.536 181.117 35.032C181.949 33.528 182.365 31.816 182.365 29.896C182.365 27.976 181.949 26.264 181.117 24.76C180.285 23.224 179.133 22.024 177.661 21.16C176.189 20.296 174.525 19.864 172.669 19.864C170.813 19.864 169.149 20.296 167.677 21.16C166.205 22.024 165.037 23.224 164.173 24.76C163.341 26.264 162.925 27.976 162.925 29.896C162.925 31.816 163.341 33.528 164.173 35.032C165.037 36.536 166.205 37.72 167.677 38.584C169.149 39.448 170.813 39.88 172.669 39.88ZM204.049 43.24C201.521 43.24 199.281 42.68 197.329 41.56C195.377 40.408 193.841 38.824 192.721 36.808C191.633 34.792 191.089 32.488 191.089 29.896C191.089 27.272 191.665 24.952 192.817 22.936C193.969 20.92 195.553 19.352 197.569 18.232C199.585 17.08 201.873 16.504 204.433 16.504C207.025 16.504 209.313 17.08 211.297 18.232C213.313 19.352 214.881 20.92 216.001 22.936C217.153 24.952 217.745 27.272 217.777 29.896L215.617 31.048C215.617 33.416 215.121 35.528 214.129 37.384C213.137 39.208 211.761 40.648 210.001 41.704C208.273 42.728 206.289 43.24 204.049 43.24ZM204.529 53.368C202.001 53.368 199.777 52.888 197.857 51.928C195.937 51 194.353 49.72 193.105 48.088C192.753 47.704 192.593 47.288 192.625 46.84C192.689 46.392 192.929 46.024 193.345 45.736C193.761 45.448 194.225 45.352 194.737 45.448C195.249 45.544 195.649 45.784 195.937 46.168C196.865 47.32 198.049 48.248 199.489 48.952C200.961 49.656 202.657 50.008 204.577 50.008C206.369 50.008 207.985 49.576 209.425 48.712C210.865 47.848 212.001 46.632 212.833 45.064C213.697 43.496 214.129 41.656 214.129 39.544V32.248L215.521 29.464L217.777 29.896V39.688C217.777 42.28 217.201 44.6 216.049 46.648C214.897 48.728 213.329 50.36 211.345 51.544C209.361 52.76 207.089 53.368 204.529 53.368ZM204.433 39.88C206.321 39.88 207.985 39.464 209.425 38.632C210.897 37.768 212.049 36.584 212.881 35.08C213.713 33.576 214.129 31.848 214.129 29.896C214.129 27.944 213.713 26.216 212.881 24.712C212.049 23.176 210.897 21.992 209.425 21.16C207.985 20.296 206.321 19.864 204.433 19.864C202.545 19.864 200.865 20.296 199.393 21.16C197.921 21.992 196.769 23.176 195.937 24.712C195.105 26.216 194.689 27.944 194.689 29.896C194.689 31.848 195.105 33.576 195.937 35.08C196.769 36.584 197.921 37.768 199.393 38.632C200.865 39.464 202.545 39.88 204.433 39.88Z"
              fill="#D0F4EA"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M26.7408 31.7407L26.7408 5L38 16.2593L38 43H38H11.2593L0 31.7407L26.7408 31.7407Z"
              fill="#FFF6E1"
            />
            <defs>
              <linearGradient
                id="paint0_linear_106_197"
                x1="26.7407"
                y1="5"
                x2="11.2593"
                y2="43"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#00FFF0" />
                <stop offset="0.364583" stopColor="#29D0D8" />
                <stop offset="1" stopColor="#717FB0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className={styles.formContainer}>
          {isRegistered ? (
            <>
              <h1>Login</h1>
              {message && <p>{message}</p>}

              <LoginForm setMessage={setMessage} />
              <p>
                No account?{' '}
                <span
                  className={styles.underline}
                  onClick={() => {
                    setMessage('');
                    setIsRegistered(false);
                  }}
                >
                  Register
                </span>
              </p>
            </>
          ) : (
            <>
              <h1>Register</h1>
              {message && <p>{message}</p>}
              <RegisterForm
                setIsRegistered={setIsRegistered}
                setMessage={setMessage}
              />
              <p>
                Have an account?{' '}
                <span
                  className={styles.underline}
                  onClick={() => {
                    setMessage('');
                    setIsRegistered(true);
                  }}
                >
                  Login
                </span>
              </p>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
