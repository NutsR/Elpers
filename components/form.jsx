import styles from "../styles/form.module.css";
function FormInput({ handleChange, handleSubmit, value }) {
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.inputArea}>
					<label htmlFor="title" className="form-label">
						Elp Camp Title
					</label>
					<input
						type="text"
						className="form-control"
						name="title"
						placeholder="Title/Name"
						required
						onChange={handleChange}
					/>
					<div className={styles.validFeedback}>
						<h6>Looks good!</h6>
					</div>
				</div>
				<div className={styles.inputArea}>
					<label htmlFor="location" className="form-label">
						location
					</label>
					<input
						type="text"
						name="location"
						placeholder="Location"
						className="form-control"
						required
						onChange={handleChange}
					/>
					<div className={styles.validFeedback}>
						<h6>Looks good!</h6>
					</div>
				</div>
				<div className={styles.inputArea}>
					<label htmlFor="description" className="form-label">
						Describe your Elp camp
					</label>
					<textarea
						name="description"
						cols="15"
						rows="5"
						placeholder="Describe your Elp Camp!"
						className="form-control"
						required
						onChange={handleChange}
					></textarea>
					<div className={styles.validFeedback}>
						<h6>Looks good!</h6>
					</div>
				</div>
				<div className={styles.inputArea}>
					<label htmlFor="price" className="form-label">
						Cost ₹/day
					</label>
					<input
						className="form-control"
						type="number"
						name="price"
						placeholder="0"
						required
						onChange={handleChange}
					/>
					<div className={styles.validFeedback}>
						<h6>Looks good!</h6>
					</div>
				</div>
				<div className={styles.inputArea}>
					<label htmlFor="images" className={styles.customLabel}>
						Upload Image Prefer Landscape images
					</label>
					<input
						type="file"
						className="form-control"
						size="60"
						id="images"
						required
						multiple
						onChange={handleChange}
					/>
					<div className={styles.validFeedback}>
						<h6>Looks good!</h6>
					</div>
				</div>
				<div className={styles.inputArea}>
					<button onClick={handleSubmit} className={styles.btn}>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}
export default FormInput;
