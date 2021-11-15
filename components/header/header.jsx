import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import styles from "./header.module.css";
function Header() {
	const { asPath } = useRouter();
	return (
		<ul
			id="header"
			className={`${styles.header} ${
				asPath === "/elpers" ? styles.fixed : styles.unfixed
			}`}
		>
			<li className={styles.navItem}>
				<Link style={{ margin: "25px 25px" }} href="/elpers" passHref>
					<a className={styles.link}>ElpCamp</a>
				</Link>
			</li>
			<li className={styles.navItem}>
				<Link style={{ margin: "25px 25px" }} href="/" passHref>
					<a className={styles.link}>Home</a>
				</Link>
			</li>
			<li className={styles.navItem}>
				<Link href="/elpers/create" passHref>
					<a className={styles.link}>Create</a>
				</Link>
			</li>
			<li className={`${styles.navItem} ${styles.login}`}>
				<Link href="/elpers/create" passHref>
					<a className={styles.link}>Login</a>
				</Link>
			</li>
		</ul>
	);
}

export default Header;
