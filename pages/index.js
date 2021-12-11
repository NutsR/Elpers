import styles from "@/styles/Home.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetElpers } from "@/lib/hooks/elpers";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/mapbox/mapbox.jsx"));
function Home() {
	const [data, { mutate }] = useGetElpers();
	const [viewport, setViewport] = useState({});
	useEffect(() => {
		if (data) {
			setViewport({
				latitude: data[0].geometry.coordinates[1],
				longitude: data[0].geometry.coordinates[0],
				zoom: 8,
			});
		}
	}, [data]);
	return (
		<div className={`${styles.container}`}>
			<main className={styles.main}>
				<h1>Welcome To ElpCamp</h1>
				<Link href="/elpers">View Elpers</Link>
				<Map
					elpers={data}
					viewport={viewport}
					setViewport={setViewport}
					token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
				/>
			</main>
		</div>
	);
}
export default Home;
