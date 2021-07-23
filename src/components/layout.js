import styles from "./layout.module.css"

export const Layout = ({ children, home }) => {
    return (
        <div className={styles.container} >
            <main>{children}</main>
        </div>
    )
}