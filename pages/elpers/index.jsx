import Link from "next/link";
import { getElpers } from "../api/elpers";
import styles from "@/styles/elper.module.css";
import dynamic from 'next/dynamic';
import Image from "next/image";
const Map = dynamic(() => import("@/components/mapbox/mapbox"));
function Post({ elpCamps, error }) {
	if (error) {
		return <div>{error.message}</div>;
	}
	return (
		<div>
			<Map elpers={elpCamps} token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN} />
			<div className={styles.main}>
				{elpCamps.map((post) => (
					<div className={styles.item} key={post._id}>
						<div className={styles.imageCtrl}>
							<Image
								layout="fill"
								className={styles.image}
								src={post.images[0].url}
								alt="post describing"
							/>
						</div>
						<div className={styles.content}>
							<div className={styles.innerContent}>
								<h5 className={styles.title}>{post.title}</h5>

								<p className={styles.description}>{post.description}</p>
								<div className={styles.btnCtrl}>
									<Link href={`/elpers/${post._id}`} passHref>
										<button className="btn-primary">View More</button>
									</Link>
								</div>
							</div>
						</div>
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
