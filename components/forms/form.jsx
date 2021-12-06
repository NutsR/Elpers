import styles from "@/styles/form.module.scss";
import { btnSuccess, btnDanger } from "@/styles/btn.module.scss";
import deleteMethod from "@/methods/delete";
import { useRouter } from "next/router";
function FormInput({
	handleChange,
	handleSubmit,
	value,
	title,
	id,
	handleBlur,
	geolocation,
}) {
	const router = useRouter();
	if (!value) {
		return <div>No ElpCamp Found</div>;
	}
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h2
					style={{
						textAlign: "center",
						fontWeight: "600",
						wordSpacing: "6px",
						marginTop: "0px",
					}}
				>
					{title || "Form"}
				</h2>
				<div className={styles.inputArea}>
					<label htmlFor="title" className="formLabel">
						<input
							autoComplete="off"
							type="text"
							minLength="5"
							className="inputControl"
							name="title"
							placeholder=" "
							required
							value={value.title ? value.title : ""}
							onChange={handleChange}
						/>
						<span className="placeholderText">Elp Camp Title</span>
					</label>
					<div className={styles.validFeedback}>
						<h6>Looks good!</h6>
					</div>
				</div>
				<div className={styles.inputArea}>
					<label htmlFor="location" className="formLabel">
						<input
							autoComplete="off"
							type="text"
							minLength="3"
							name="location"
							onBlur={handleBlur}
							className="inputControl"
							placeholder=" "
							value={value.location ? value.location : ""}
							required
							onChange={handleChange}
						/>
						<span className="placeholderText">Location</span>
						{geolocation && (
							<div id="location">
								<div>
									<b>Near :</b>
									<br />
									<span>{geolocation.place_name}</span>
								</div>
							</div>
						)}
					</label>
					<div className={styles.validFeedback}>
						<h6>Looks good!</h6>
					</div>
				</div>
				<div className={styles.inputArea}>
					<label htmlFor="description" className="formLabel">
						<textarea
							name="description"
							minLength="5"
							cols="15"
							rows="5"
							placeholder=" "
							className="inputControl"
							value={value.description ? value.description : ""}
							required
							onChange={handleChange}
						></textarea>
						<span className="placeholderText">Describe your Elp camp</span>
					</label>
					<div className={styles.validFeedback}>
						<h6>Looks good!</h6>
					</div>
				</div>
				<div className={styles.inputArea}>
					<label htmlFor="price" className="formLabel">
						<input
							autoComplete="off"
							className="inputControl"
							type="number"
							name="price"
							placeholder=" "
							value={value.price ? value.price : ""}
							required
							onChange={handleChange}
						/>

						<span className="placeholderText">Cost ₹/day</span>
					</label>
					<div className={styles.validFeedback}>
						<h6>Looks good!</h6>
					</div>
				</div>
				{router.pathname === "/elpers/[id]/edit" ? null : (
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
						<div className={styles.validFeedback}>
							<h6>Looks good!</h6>
						</div>
					</div>
				)}
				<div className={styles.inputArea}>
					<button onClick={handleSubmit} className={btnSuccess}>
						Submit
					</button>
					{router.pathname === "/elpers/[id]/edit" && (
						<button
							className={btnDanger}
							onClick={() => {
								deleteMethod(id);
							}}
						>
							Delete
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
export default FormInput;
