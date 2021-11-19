import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./header.module.css";
import useUser from "@/lib/auth/hooks";
function Header() {
	const [user, { mutate }] = useUser();
	const [dropDown, setDropDown] = useState(false);
	const { asPath } = useRouter();
	const handleLogout = async () => {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_DOMAIN}/api/user/logout`,
			{
				method: "POST",
			}
		);
		if (res.status === 204) {
			mutate(null);
		}
	};
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
				{!user ? (
					<Link href="/user/register" passHref>
						<a className={styles.link}>Login</a>
					</Link>
				) : (
					<>
						<span
							className={styles.link}
							onClick={() => setDropDown(!dropDown)}
						>
							{user.userObj.username}
						</span>
						{!dropDown ? null : (
							<span
								onClick={handleLogout}
								style={{
									width: "100%",
									height: "50%",
									display: "block",
									zIndex: "10",
									position: "absolute",
									top: "50px",
								}}
							>
								Logout
							</span>
						)}
					</>
				)}
			</li>
		</ul>
	);
}

export default Header;
