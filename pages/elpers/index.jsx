import Link from "next/link";
import { getElpers } from "../api/elpers";
import Map from "../../components/mapbox/mapbox";
import styles from "../../styles/elper.module.css";
function Post({ elpCamps, error }) {
	if (error) {
		return <div>{error.message}</div>;
	}
	if (!elpCamps) return <div>Loading</div>;
	return (
		<div>
			<Map elpers={elpCamps} />
			<div className={styles.main}>
				{elpCamps.map((post) => (
					<div className={styles.item} key={post._id}>
						<h5 className={styles.title}>{post.title}</h5>
						<div className={styles.imageCtrl}>
							<img
								style={{ width: "inherit", height: "inherit" }}
								src={post.images[0].url}
								alt="post describing"
							/>
						</div>
						<Link href={`/elpers/${post._id}`}>
							<button className={styles.btn}>View More</button>
						</Link>
					</div>
				))}
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
