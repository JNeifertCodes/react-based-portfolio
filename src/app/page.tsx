import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Confirming configuration setup.</h1>
          <p>Checking out separate branch for different changes.</p>
        </div>
        <div className={styles.ctas}>
          <a>
            Testing that this branch is not auto-deployed to vercel preview.
          </a>
        </div>
      </main>
    </div>
  );
}
