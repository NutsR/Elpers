import useUser from "@/lib/auth/hooks";
import Router from "next/router";
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";

function Login() {
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
				setErrorMsg("invalid fields");
			}
		} catch (error) {
			throw new Error(error.message);
		}
	};
	useEffect(() => {
		if (user) Router.push("/");
	}, [user]);
	return (
		<div>
			{errorMsg ? errorMsg : null}
			<form onSubmit={handleSubmit}>
				<input type="text" name="username" required />
				<label htmlFor="username">Username</label>
				<input type="password" name="password" required />
				<label htmlFor="password">Password</label>
				<button>Login</button>
				<Link href="/user/register">New here? Register Now!</Link>
			</form>
		</div>
	);
}

export default Login;
