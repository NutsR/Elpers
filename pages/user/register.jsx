import { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import useUser from "@/lib/auth/hooks";
import styles from "@/styles/register.module.scss";
import { btnSuccess } from "@/styles/btn.module.scss";
function Register() {
	const [user, { mutate }] = useUser();
	const [errorMsg, setErrorMsg] = useState("");
	async function onSubmit(e) {
		e.preventDefault();
		const body = {
			username: e.currentTarget.username.value,
			password: e.currentTarget.password.value,
			email: e.currentTarget.email.value,
		};
		if (body.password !== e.currentTarget.rpassword.value) {
			setErrorMsg(`The passwords don't match`);
			return;
		}
		const res = await fetch("/api/user", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		if (res.status === 201) {
			const userObj = await res.json();
			// set user to useSWR state
			mutate(userObj);
		} else {
			setErrorMsg(await res.text());
		}
	}
	useEffect(() => {
		// redirect to home if user is authenticated
		if (user) Router.push("/");
	}, [user]);
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Register a New Elper</h1>
			{errorMsg && <p className={styles.error}>{errorMsg}</p>}
			<form onSubmit={onSubmit} className={styles.formContainer}>
				<div className="">
					<label className={`${styles.labelStyles} formLabel`}>
						<input
							className={`${styles.inputStyles} inputControl`}
							autoComplete="off"
							type="text"
							name="username"
							required
							placeholder=" "
						/>
						<span className="placeholderText">Username</span>
					</label>
				</div>
				<div className="">
					<label className={`${styles.labelStyles} formLabel`}>
						<input
							className={`${styles.inputStyles} inputControl`}
							autoComplete="off"
							type="password"
							name="password"
							minLength={8}
							required
							placeholder=" "
						/>
						<span className="placeholderText">Password</span>
					</label>
				</div>
				<div className="">
					<label className={`${styles.labelStyles} formLabel`}>
						<input
							className={`${styles.inputStyles} inputControl`}
							autoComplete="off"
							minLength={8}
							type="password"
							name="rpassword"
							required
							placeholder=" "
						/>
						<span className="placeholderText">Repeat password</span>
					</label>
				</div>
				<div className="">
					<label className={`${styles.labelStyles} formLabel`}>
						<input
							className={`${styles.inputStyles} inputControl`}
							autoComplete="off"
							type="email"
							name="email"
							required
							placeholder=" "
						/>
						<span className="placeholderText">Email</span>
					</label>
				</div>
				<div className={"submit"}>
					<button className={btnSuccess} type="submit">
						Sign up
					</button>
				</div>
			</form>
		</div>
	);
}
export default Register;
