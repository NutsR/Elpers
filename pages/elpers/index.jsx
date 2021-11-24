import { getElpers } from "../api/elpers";
import styles from "@/styles/elper.module.scss";
import dynamic from "next/dynamic";
import useSWR, { SWRConfig } from "swr";
import { useEffect, useState } from "react";

const Camps = dynamic(() => import("@/components/camps/camps"), {
	loading: () => (
		<div className="overlay">
			<div className="loader middle-load" />
		</div>
	),
});

const Map = dynamic(() => import("@/components/mapbox/mapbox"), {
	loading: () => <div className="loader middle-load"></div>,
	ssr: false,
});

const fetcher = (...args) => fetch(...args).then((res) => res.json());
function Post({ fallback, error }) {
	const [hide, setHidden] = useState(true);
	const [mount, setMount] = useState(false);
	useEffect(() => {
		setMount(true);
		const timer = setInterval(() => {
			setHidden(false);
		}, 10000);
		return () => clearInterval(timer);
	}, []);
	const { data, mutate } = useSWR(mount ? "/api/elpers" : null, fetcher);
	if (error) {
		return <div>{error.message}</div>;
	}
	return (
		<SWRConfig value={fallback}>
			{data === undefined || data[0] === undefined ? null : (
				<Map elpers={data} token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN} />
			)}
			<div className={styles.main}>
				<h2 className={styles.mainTitle}>ElpCamps</h2>
				{data && data.length > 0 ? (
					data.map((post) => <Camps key={post._id} styles={styles} post={post} />)
				) : (
					<>{!hide && <div>Not Found</div>}</>
				)}
			</div>
		</SWRConfig>
	);
}

export async function getServerSideProps({ req, res }) {
	res.setHeader(
		"Cache-Control",
		"public, s-maxage=10, stale-while-revalidate=59"
	);
	try {
		const data = await getElpers();
		return {
			props: {
				fallback: {
					"/api/elpers": data,
				},
			},
		};
	} catch (err) {
		return { props: { error: err } };
	}
}
export default Post;
