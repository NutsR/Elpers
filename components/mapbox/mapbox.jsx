import { useState, useMemo, useEffect, memo } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import MapGL, { Marker, Popup } from "react-map-gl";
import styles from "./mapbox.module.scss";
import Image from "next/image";
import Link from "next/link";
function Map({ elpers, token, viewport, setViewport }) {
	const [size, setSize] = useState(true);
	useEffect(() => {
		if (typeof window !== "undefined") {
			window.innerWidth > 800 ? setSize(true) : setSize(false);
		}
	}, []);
	const [popupInfo, setPopupInfo] = useState(null);

	const markers = useMemo(
		() =>
			elpers &&
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
				width={size ? "40.8vw" : "79.8vw"}
				height={size ? "45vh" : "33.5vh"}
				onViewportChange={setViewport}
				mapStyle="mapbox://styles/mapbox/streets-v11?optimize=true"
				minZoom={3}
				maxZoom={40}
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
								width={25}
								height={25}
								layout={"responsive"}
								src={popupInfo.images[0].url}
								alt="location"
							/>
							<Link href={`/elpers/${popupInfo._id}`} passHref>
								<span>View More</span>
							</Link>
						</div>
					</Popup>
				)}
			</MapGL>
		</div>
	);
}

export default memo(Map);
