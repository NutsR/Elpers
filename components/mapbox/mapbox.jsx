import { useState, useMemo, useEffect } from "react";
import MapGL, { Marker, Popup } from "react-map-gl";
import styles from "./mapbox.module.css";
import Image from "next/image";
import Link from "next/link";
function Map({ elpers, token }) {
	const [size, setSize] = useState(true);
	useEffect(() => {
		if (typeof window !== "undefined") {
			window.innerWidth > 800 ? setSize(true) : setSize(false);
		}
	}, []);
	const [popupInfo, setPopupInfo] = useState(null);
	const [viewport, setViewport] = useState({
		latitude: elpers[0].geometry.coordinates[1],
		longitude: elpers[0].geometry.coordinates[0],
		zoom: 8,
	});

	const markers = useMemo(
		() =>
			elpers.map((camp) => (
				<div key={camp._id}>
					<Marker
						latitude={camp.geometry.coordinates[1]}
						longitude={camp.geometry.coordinates[0]}
						onClick={() => setPopupInfo(camp)}
					>
						<Image src="/pin256x256.png" alt="me" width="30" height="30" />
					</Marker>
				</div>
			)),
		[elpers]
	);

	return (
		<div className={styles.map}>
			<MapGL
				mapboxApiAccessToken={token}
				{...viewport}
				width="98.8vw"
				height={size ? "65vh" : "33.5vh"}
				onViewportChange={setViewport}
				mapStyle="mapbox://styles/mapbox/dark-v10"
			>
				{markers}
				{popupInfo && (
					<Popup
						tipSize={5}
						latitude={popupInfo.geometry.coordinates[1]}
						longitude={popupInfo.geometry.coordinates[0]}
						closeButton={true}
						onClose={setPopupInfo}
						anchor="top"
					>
						<div>
							<div>
								<b>{popupInfo.title}</b>
							</div>
							<Image
								width={50}
								height={50}
								layout={"responsive"}
								src={popupInfo.images[0].url}
								alt="location"
							/>
							<Link href={`/elpers/${popupInfo._id}`}>
								<span>View More</span>
							</Link>
						</div>
					</Popup>
				)}
			</MapGL>
		</div>
	);
}

export default Map;
/* */
