import { useEffect, useState } from "react";
import { useElpersById } from "@/lib/hooks/elpers";
import { useRouter } from "next/router";
import CampDetails from "@/components/camps/camp-details";
import dynamic from "next/dynamic";
const DetailedMap = dynamic(() => import("@/components/mapbox/details.map"), {
	ssr: false,
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
				<CampDetails data={data} mutate={mutate}>
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
