import Link from "next/link";
import { btnPrimary } from "@/styles/btn.module.scss";
import Image from "next/image";

function Camps({ styles, post }) {
	return (
		<div className={styles.item}>
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
					<span className={styles.muted}>Location: {post.location}</span>
					<span className={styles.description}>
						<span>
							<span className={styles.smText}>
								{post.description.substr(0, 150)}...{" "}
							</span>
							<span className={styles.mdText}>
								{post.description.substr(0, 170)}...{" "}
							</span>
							<Link href={`/elpers/${post._id}`} passHref>
								<a className={styles.decroLink}>Continue Reading...</a>
							</Link>
						</span>
					</span>
					<div className={styles.btnCtrl}>
						<Link href={`/elpers/${post._id}`} passHref>
							<button className={btnPrimary}>View More</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Camps;
