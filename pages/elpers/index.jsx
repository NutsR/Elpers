import styles from "@/styles/elper.module.scss";
import dynamic from "next/dynamic";
import { getElpers } from "@/lib/hooks/elpers";
import { useEffect, useState } from "react";

const Camps = dynamic(() => import("@/components/camps/camps"), {
	loading: () => (
		<div className="overlay">
			<div className="loader middle-load" />
		</div>
	),
});

function Post() {
	const [hide, setHidden] = useState(true);
	const [reviews, showReviews] = useState(false);

	useEffect(() => {
		const timer = setInterval(() => {
			setHidden(false);
		}, 10000);
		return () => clearInterval(timer);
	}, []);

	const [data, { mutate, loading }] = getElpers();

	return (
		<>
			{loading && (
				<div className="overlay">
					<div className="loader middle-load" />
				</div>
			)}
			<div className={styles.main}>
				<h2 className={styles.mainTitle}>ElpCamps</h2>
				{data && data.length > 0 ? (
					data.map((post) => (
						<>
							<Camps
								key={post._id}
								styles={styles}
								post={post}
								handleHover={showReviews}
							/>
							{reviews &&
								post.review.map((el) => <span key={el._id}>{el.review}</span>)}
						</>
					))
				) : (
					<>{!hide && <div>Not Found</div>}</>
				)}
			</div>
		</>
	);
}

export default Post;
