import Link from "next/link";
import styles from "../styles/navigation-bar.module.scss";

const NavigationBar = () => {
  return (
    <div className={styles.navigationbar}>
      <button className={styles.button}>
        <Link href="/dashboards/DashBoards">
          <a>Dashboard</a>
        </Link>
      </button>
      <button className={styles.button}>
        <Link href="/settings/Settings">
          <a>Setting</a>
        </Link>
      </button>
    </div>
  );
};

export default NavigationBar;
