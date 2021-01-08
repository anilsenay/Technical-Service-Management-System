import Head from "next/head";
import LoginForm from "../components/LoginForm";
import styles from "../styles/login.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.content}>
            <a className={styles.loginText}>Login</a>
            <LoginForm text="testt" />
          </div>
        </div>
      </main>
    </div>
  );
}
