import Link from "next/dist/client/link";
import styles from "./header.module.css";
function Header() {
	return (
		<ul className={styles.header}>
			<li className={styles.navItem}>
				<Link style={{ margin: "25px 25px" }} href="/">
					<a className={styles.link}>Home</a>
				</Link>
			</li>
			<li className={styles.navItem}>
				<Link href="/elpers/create">
					<a className={styles.link}>Create</a>
				</Link>
			</li>
			<li className={`${styles.navItem} ${styles.login}`}>
				<Link href="/elpers/create">
					<a className={styles.link}>Login</a>
				</Link>
			</li>
		</ul>
	);
}

export default Header;
