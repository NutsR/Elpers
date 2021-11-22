import styles from "@/styles/form.module.scss";
import { btnSuccess } from "@/styles/btn.module.scss";
function FormInput({ handleChange, handleSubmit, value, title }) {
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
							className="inputControl"
							placeholder=" "
							value={value.location ? value.location : ""}
							required
							onChange={handleChange}
						/>
						<span className="placeholderText">Location</span>
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
				{value.images instanceof Array && value.images[0].url ? null : (
					<div className={styles.inputArea}>
						<label htmlFor="images" className={styles.customLabel}>
							Upload Image Prefer Landscape images
						</label>
						<input
							autoComplete="off"
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
				</div>
			</div>
		</div>
	);
}
export default FormInput;
