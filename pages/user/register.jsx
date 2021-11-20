import { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import useUser from "@/lib/auth/hooks";

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
		<>
			<h1>Sign up to Example</h1>
			{errorMsg && <p className="error">{errorMsg}</p>}
			<div className="form-container">
				<form onSubmit={onSubmit}>
					<label>
						<span>Username</span>
						<input autoComplete="off" type="text" name="username" required />
					</label>
					<label>
						<span>Password</span>
						<input
							autoComplete="off"
							type="password"
							name="password"
							required
						/>
					</label>
					<label>
						<span>Repeat password</span>
						<input
							autoComplete="off"
							type="password"
							name="rpassword"
							required
						/>
					</label>
					<label>
						<span>Email</span>
						<input autoComplete="off" type="email" name="email" required />
					</label>
					<div className="submit">
						<button type="submit">Sign up</button>
						<Link href="/user/login">
							<a>I already have an account</a>
						</Link>
					</div>
				</form>
			</div>
		</>
	);
}
export default Register;
