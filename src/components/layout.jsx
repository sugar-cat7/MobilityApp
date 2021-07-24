import styles from "./layout.module.css";
import Image from 'next/image'
import iconSrc from '../../public/car_jidou_unten.png'
import Avatar from '@material-ui/core/Avatar';

export const Layout = ({ children, home }) => {
  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <div><Avatar alt="Remy Sharp" src="/car_jidou_unten.png" classes={{img: styles.icon}}/></div>
          <div className={styles.title}>簡単経路くん</div>
        </header>
        <div className={styles.body}>
          <main>{children}</main>
        </div>
        <footer className={styles.footer}>© 2021 mai-ogi</footer>
      </div>
    </>
  );
};
