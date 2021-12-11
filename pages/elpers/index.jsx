import styles from "@/styles/elper.module.scss";
import dynamic from "next/dynamic";
import { useGetElpers } from "@/lib/hooks/elpers";
import { useEffect, useState } from "react";

import Camps from "@/components/camps/camps";

function Post() {
	const [hide, setHidden] = useState(true);

	useEffect(() => {
		const timer = setInterval(() => {
			setHidden(false);
		}, 10000);
		return () => clearInterval(timer);
	}, []);

	const [data, { mutate, loading }] = useGetElpers();

	return (
		<>
			{loading && (
				<div className="overlay">
					<div className="loader middle-load" />
				</div>
			)}
			<div className={styles.main}>
				<h1 className={styles.mainTitle}>ElpCamps</h1>
				{data && data.length > 0 ? (
					data.map((post, i) => (
						<>
							<Camps key={i} styles={styles} post={post} />
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
