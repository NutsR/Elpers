import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import dbConnect from "../lib/connection";
export default function Home({ success, error }) {
	return (
		<div className={styles.container}>
			<Head>
                                <meta name="theme-color" content="#fff"/>
				<title>ElpCamp</title>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="description" content="Generated by create next app" />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
				/>
				<link
					href="https://api.mapbox.com/mapbox-gl-js/v2.5.1/mapbox-gl.css"
					rel="stylesheet"
				/>
				<link rel="manifest" href="/manifest.json" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{success ? (
				<main className={styles.main}>
					<h1>Hello</h1>
					<Link href="/elpers">To Posts</Link>
				</main>
			) : (
				<div>{error.message}</div>
			)}
		</div>
	);
}

export const getServerSideProps = async () => {
	try {
		await dbConnect();
		return {
			props: {
				success: true,
			},
		};
	} catch (error) {
		return {
			props: {
				error,
			},
		};
	}
};
