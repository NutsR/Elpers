import styles from "@/styles/Home.module.scss";
import Link from "next/link";
import dbConnect from "@/lib/connection";
export default function Home({ success, error }) {
	return (
		<div className={styles.container}>
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
