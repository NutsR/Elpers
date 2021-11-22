import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./header.module.scss";
import useUser from "@/lib/auth/hooks";
import dynamic from "next/dynamic";
const LoginForm = dynamic(() => import("@/components/login/login.jsx"));
const ProfileOpts = dynamic(() => import("@/components/profile/profileOpts"));
function Header() {
	const [user, { mutate }] = useUser();
	const [profile, showProfile] = useState(false);
	const [login, showLogin] = useState(false);
	const { asPath } = useRouter();

	return (
		<div>
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
						<span className={styles.link} onClick={() => showLogin(!login)}>
							Login
						</span>
					) : (
						<>
							<span
								className={styles.link}
								onClick={() => showProfile(!profile)}
							>
								{user.userObj?.username}
							</span>
						</>
					)}
				</li>
			</ul>

			{profile && <ProfileOpts showProfile={showProfile} mutate={mutate} />}
			{login && <LoginForm showLogin={showLogin} />}
		</div>
	);
}

export default Header;
