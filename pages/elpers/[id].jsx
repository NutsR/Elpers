import { getElperById } from "../api/elpers/[id]";

function PostDetails({ elpCamp }) {
	return (
		<div>
			{elpCamp.title} By {elpCamp.user.username}{" "}
			<div>
				Reviews :{" "}
				{elpCamp.review.map((el) => (
					<p key={el._id}>{el.review}Hi</p>
				))}
			</div>
		</div>
	);
}

export async function getServerSideProps({ params: { id } }) {
	const elpCamp = await getElperById(id);
	return {
		props: {
			elpCamp,
		},
	};
}

export default PostDetails;
