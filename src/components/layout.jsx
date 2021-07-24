import styles from "./layout.module.css";

export const Layout = ({ children, home }) => {
  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>ヘッダーつける？</header>
        <div className={styles.body}>
          <main>{children}</main>
        </div>
        <footer className={styles.footer}>© 2021 mai-ogi</footer>
      </div>
    </>
  );
};
