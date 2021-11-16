import { useState, useMemo, memo } from "react";
import MapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./detail.module.scss";
import Image from "next/image";
function DetailedMap({ elpers, height, width, token }) {
	const [popupInfo, setPopupInfo] = useState(null);
	const [viewport, setViewport] = useState({
		latitude: elpers.geometry.coordinates[1],
		longitude: elpers.geometry.coordinates[0],
		zoom: 16,
	});

	const markers = useMemo(
		() => (
			<div>
				<Marker
					latitude={elpers.geometry.coordinates[1]}
					longitude={elpers.geometry.coordinates[0]}
					onClick={() => setPopupInfo(elpers)}
				>
					<Image src="/pin256x256.png" alt="me" width="30" height="30" />
				</Marker>
			</div>
		),
		[elpers]
	);

	return (
		<div className={styles.map}>
			<MapGL
				mapboxApiAccessToken={token}
				{...viewport}
				width={width}
				height={height}
				onViewportChange={setViewport}
				mapStyle="mapbox://styles/mapbox/dark-v10?optimize=true"
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
								<h5 style={{ padding: "0px", margin: "0px" }}>
									{popupInfo.title}
								</h5>
								{popupInfo.location}
							</div>
							<Image
								width={50}
								height={50}
								layout={"responsive"}
								src={popupInfo.images[0].url}
								alt="location"
							/>
						</div>
					</Popup>
				)}
			</MapGL>
		</div>
	);
}

export default memo(DetailedMap);
