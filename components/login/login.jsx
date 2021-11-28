import useUser from "@/lib/hooks/hooks";
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import styles from "./login.module.scss";
import { btnSuccess } from "@/styles/btn.module.scss";
import Router from "next/router";
function LoginForm({ showLogin }) {
	const [user, { mutate }] = useUser();
	const [errorMsg, setErrorMsg] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const body = {
			username: e.currentTarget.username.value,
			password: e.currentTarget.password.value,
		};
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_DOMAIN || ""}/api/user/login`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(body),
				}
			);
			if (res.status === 200) {
				mutate(await res.json());
			} else {
				setErrorMsg("Invalid Fields");
			}
		} catch (error) {
			setErrorMsg(error.message);
		}
	};
	useEffect(() => {
		if (user) {
			showLogin(false);
		}
	}, [user]);
	Router.events.on("routeChangeComplete", () => showLogin(false));
	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit}>
				{errorMsg && <div className={styles.error}>{errorMsg}</div>}
				<div className={styles.fieldStyles}>
					<label
						htmlFor="username"
						className={`${styles.labelStyles} formLabel`}
					>
						<input
							autoComplete="off"
							type="text"
							name="username"
							required
							className={`${styles.inputStyles} inputControl`}
							placeholder=" "
						/>
						<span className={`${styles.placeholderStyles} placeholderText`}>
							Username
						</span>
					</label>
				</div>
				<div className={styles.fieldStyles}>
					<label
						htmlFor="password"
						className={`${styles.labelStyles} formLabel`}
					>
						<input
							autoComplete="off"
							type="password"
							name="password"
							placeholder=" "
							required
							className={`${styles.inputStyles} inputControl`}
						/>
						<span className={`${styles.placeholderStyles} placeholderText`}>
							Password
						</span>
					</label>
				</div>
				<button className={btnSuccess}>Login</button>
				<Link href="/user/register" passHref>
					<a onClick={() => showLogin(false)}>New here? Register Now!</a>
				</Link>
			</form>
		</div>
	);
}
export default LoginForm;
