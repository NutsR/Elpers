import Link from "next/dist/client/link";
import styles from "./header.module.css";
function Header() {
	return (
		<nav className={styles.header}>
			<span className={styles.navItem}>
				<Link style={{ margin: "25px 25px" }} href="/">
					Home
				</Link>
			</span>
			<span className={styles.navItem}>
				<Link href="/elpers/create"> Create</Link>
			</span>
			<span className={`${styles.navItem} ${styles.login}`}>
				<Link href="/elpers/create"> Login </Link>
			</span>
		</nav>
	);
}

export default Header;
