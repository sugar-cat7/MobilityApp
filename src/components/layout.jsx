import styles from "./layout.module.css";

export const Layout = ({ children, home }) => {
  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>ヘッダーつける？</header>
        <div className={styles.main}>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};
