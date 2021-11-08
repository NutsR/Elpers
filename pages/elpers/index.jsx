import Link from "next/link";
import { getElpers } from "../api/elpers";
import Map from "../../components/mapbox/mapbox";
import styles from "./elper.module.css";
function Post({ elpCamps, error }) {
	if (error) {
		return <div>{error.message}</div>;
	}
	if (!elpCamps) return <div>Loading</div>;
	return (
		<div>
			<hr />

			<div className={styles.main}>
				{elpCamps.length}
				{elpCamps.map((post) => (
					<div className={styles.item} key={post._id}>
						<h5>{post.title}</h5>
						<img
							style={{ width: "25%", height: "20%" }}
							src={post.images[0].url}
							alt="post describing"
						/>
						<Link href={`/elpers/${post._id}`}>See more</Link>
					</div>
				))}
			</div>
			<div>
				<Link style={{ margin: "25px 25px" }} href="/">
					Home
				</Link>
				<Link href="/elpers/create">Create</Link>
			</div>
		</div>
	);
}

export async function getServerSideProps() {
	try {
		const elpCamps = await getElpers();
		return { props: { elpCamps } };
	} catch (err) {
		return { props: { error: err } };
	}
}
export default Post;
