import { useRouter } from "next/router";
import { useElpersById } from "@/lib/hooks/elpers";
import styles from "@/styles/upload.module.scss";
import Image from "next/image";
import { useState } from "react";
function Upload() {
	const { id } = useRouter().query;
	const [data, { mutate, loading }] = useElpersById(id);
	const [loader, setLoader] = useState(false);
	const [imgDel, setImgDel] = useState([]);
	const handleChange = async (e) => {
		setLoader(true);
		let formdata = new FormData();
		for (let i = 0; i < e.target.files.length; i++) {
			formdata.append(`photos`, e.target.files[i]);
		}
		formdata.append("elpers", JSON.stringify({ key: "be value" }));
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_DOMAIN || ""}/api/elpers/${data._id}`,
			{
				method: "post",
				body: formdata,
			}
		);

		if (res.status === 200) {
			setLoader(false);
			mutate();
		}
	};
	const handleClick = (e) => {
		const name = e.target.name;
		const id = e.target.value;
		if (imgDel.some((item) => item.name === name)) {
			return setImgDel(imgDel.filter((item) => item.name !== name));
		}
		return setImgDel([...imgDel, { name, publicId: id }]);
	};
	const handleSubmit = async () => {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_DOMAIN || ""}/api/elpers/${data._id}/upload`,
			{
				method: "delete",
				body: JSON.stringify({ image: imgDel }),
			}
		);
		if (res.status === 200) {
			mutate();
		}
	};
	return (
		<div className="">
			{data ? (
				data.images.map((image, i) => (
					<div key={i} className={styles.imageCtrl}>
						<Image
							className={styles.image}
							layout="fill"
							src={image.url}
							alt="related to location/title"
						></Image>
						<input
							type="checkbox"
							name={`img_${i}`}
							value={image.publicId}
							onClick={handleClick}
						/>
						{imgDel.some((item) => item.id === image.publicId) ? (
							<h1>Marked</h1>
						) : null}
					</div>
				))
			) : (
				<div className="overlay">
					<div className="loader middle-load" />
				</div>
			)}
			{loader && (
				<div className="overlay">
					<div className="loader middle-load" />
				</div>
			)}
			{data && data.images.length >= 3 ? null : (
				<div className={styles.inputArea}>
					<label htmlFor="images" className={styles.customLabel}>
						Upload Image Prefer Landscape images
					</label>
					<input
						type="file"
						className="inputControl"
						size="60"
						id="images"
						name="images"
						required
						multiple
						onChange={handleChange}
					/>
				</div>
			)}
			<button onClick={handleSubmit}>Delete Marked Images</button>
		</div>
	);
}
export default Upload;
