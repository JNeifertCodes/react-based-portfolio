import styles from "./page.module.css";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Jenna Neifert</h1>
          <p>Portfolio coming soon...</p>
          <div className="flex min-h-svh items-center justify-center">
            <Button>Click me</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
