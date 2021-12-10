import { useElpersById } from "@/lib/hooks/elpers";
import { swalError, swalSuccess } from "@/methods/Swal.fire";
import styles from "@/styles/form.module.scss";
import { btnSuccess } from "@/styles/btn.module.scss";
import { useState } from "react";
function ReviewForm({ id }) {
	const [data, { mutate }] = useElpersById(id);
	const [rating, setRating] = useState(0);
	const handleChange = (e) => {
		setRating(e.target.value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const body = {
			rating,
			review: e.currentTarget.review.value,
			id,
		};
		e.currentTarget.review.value = "";
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_DOMAIN || ""}/api/review`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(body),
				}
			);
			if (res.status === 200) {
				mutate();
				swalSuccess();
			}
		} catch (err) {
			swalError(err);
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit} className={styles.reviewForm}>
				<div className="mb-3">
					<fieldset className="starability-growRotate">
						<input
							type="radio"
							id="no-rate-growRotate"
							className="input-no-rate"
							onChange={handleChange}
							name="rating"
							value="1"
							checked
							aria-label="No rating."
						/>
						<input
							type="radio"
							id="growRotate-rate1"
							name="rating"
							value="1"
							onChange={handleChange}
						/>
						<label htmlFor="growRotate-rate1" title="Terrible">
							1 star
						</label>
						<input
							type="radio"
							id="growRotate-rate2"
							name="rating"
							value="2"
							onChange={handleChange}
						/>
						<label htmlFor="growRotate-rate2" title="Not good">
							2 stars
						</label>
						<input
							type="radio"
							id="growRotate-rate3"
							name="rating"
							value="3"
							onChange={handleChange}
						/>
						<label htmlFor="growRotate-rate3" title="Average">
							3 stars
						</label>
						<input
							type="radio"
							id="growRotate-rate4"
							name="rating"
							value="4"
							onChange={handleChange}
						/>
						<label htmlFor="growRotate-rate4" title="Very good">
							4 stars
						</label>
						<input
							type="radio"
							id="growRotate-rate5"
							name="rating"
							value="5"
							onChange={handleChange}
						/>
						<label htmlFor="growRotate-rate5" title="Amazing">
							5 stars
						</label>
					</fieldset>
				</div>
				<div className={styles.inline}>
					<label className={`${styles.labelStyles} formLabel`} htmlFor="review">
						<textarea
							className={`${styles.textarea} inputControl`}
							name="review"
							cols="20"
							rows="2"
							placeholder=" "
							required
						></textarea>
						<span className="placeholderText">Write A Review</span>
					</label>
				</div>

				<button className={btnSuccess}>Submit</button>
			</form>
		</>
	);
}
export default ReviewForm;
