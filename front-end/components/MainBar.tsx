import styles from "../styles/main-bar.module.scss"

const MainBar = () => {
  return (
    <div className={styles.mainbar}>
        <span className={styles.logo}>MiniDev Extension I</span>
        <span className={styles.title}>Sales Manager Panel</span>
    </div>
  )
}

export default MainBar;
