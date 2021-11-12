import styles from "../styles/form.module.css";
function FormInput({ handleChange, handleSubmit, value }) {
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.inputArea}>
					<label htmlFor="title" className="formLabel">
						<input
							type="text"
							minLength="5"
							className="inputControl"
							name="title"
							placeholder=" "
							required
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
							type="text"
							minLength="3"
							name="location"
							className="inputControl"
							placeholder=" "
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
							className="inputControl"
							type="number"
							name="price"
							placeholder=" "
							required
							onChange={handleChange}
						/>
						<span className="placeholderText">Cost ₹/day</span>
					</label>
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
				<div className={styles.inputArea}>
					<button onClick={handleSubmit} className="btn-success">
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}
export default FormInput;
