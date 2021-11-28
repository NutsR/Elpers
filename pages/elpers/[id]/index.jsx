import { useEffect, useState } from "react";
import styles from "@/styles/id.module.scss";
import dynamic from "next/dynamic";
import { useElpersById } from "@/lib/hooks/elpers";
import { useRouter } from "next/router";

const DetailedMap = dynamic(() => import("@/components/mapbox/details.map"), {
	loading: () => <div className="loader"></div>,
	ssr: false,
});

const CampDetails = dynamic(() => import("@/components/camps/camp-details"), {
	loading: () => (
		<div className="overlay">
			<div className="loader middle-load" />
		</div>
	),
});

function PostDetails() {
	const { id } = useRouter().query;
	const [data, { mutate, loading }] = useElpersById(id);
	const [size, setSize] = useState(true);
	useEffect(() => {
		if (typeof window !== "undefined") {
			window.innerWidth > 800 ? setSize(true) : setSize(false);
		}
	}, []);

	return (
		<>
			{loading ? (
				<div className="overlay">
					<div className="loader middle-load" />
				</div>
			) : (
				<CampDetails styles={styles} data={data}>
					<DetailedMap
						elpers={data}
						width={size ? "36vw" : "100vw"}
						height={size ? "40.6vh" : "30vh"}
						token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
					/>
				</CampDetails>
			)}
		</>
	);
}

export default PostDetails;
