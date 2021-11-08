function FormInput({ handleChange, handleSubmit, value }) {
	return (
		<div>
			<div className="mb-3">
				<label htmlFor="title" className="form-label">
					Elp Camp Title
				</label>
				<input
					type="text"
					className="form-control"
					name="title"
					placeholder="elp camp title"
					required
					onChange={handleChange}
				/>
				<div className="valid-feedback">
					<h6>Looks good!</h6>
				</div>
			</div>
			<div className="mb-3">
				<label htmlFor="location" className="form-label">
					location
				</label>
				<input
					type="text"
					name="location"
					placeholder="location htmlFor elp camp"
					className="form-control"
					required
					onChange={handleChange}
				/>
				<div className="valid-feedback">
					<h6>Looks good!</h6>
				</div>
			</div>
			<div className="mb-3">
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
				<div className="valid-feedback">
					<h6>Looks good!</h6>
				</div>
			</div>
			<div className="mb-3">
				<label htmlFor="price" className="form-label">
					Cost ₹/day
				</label>
				<input
					className="form-control"
					type="number"
					name="price"
					required
					onChange={handleChange}
				/>
				<div className="valid-feedback">
					<h6>Looks good!</h6>
				</div>
			</div>
			<div className="mb-3">
				<label htmlFor="images" className="form-label">
					Upload Or enter a link of your image example
					"https://myimageshouldbethis.com?image=ad8238afdjka13"
				</label>
				<input
					type="file"
					className="form-control"
					name="images"
					required
					multiple
					onChange={handleChange}
				/>
				<div className="valid-feedback">
					<h6>Looks good!</h6>
				</div>
			</div>
			<div className="mb-3">
				<button onClick={handleSubmit} className=" btn btn-success">
					Submit
				</button>
			</div>
		</div>
	);
}
export default FormInput;
