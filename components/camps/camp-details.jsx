import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import useUser from "@/lib/hooks/hooks";
import styles from "@/styles/id.module.scss";
import ReviewForm from "../forms/review";
import ReviewDetails from "../review/reviewdetails";

function CampDetails({ data, mutate, children }) {
	const [user] = useUser();
	const [menu, showMenu] = useState(false);
	const [nextImg, setNextImg] = useState(0);

	const handleClick = () => {
		console.log(data.images.length);
		if (nextImg === data.images.length - 1) {
			setNextImg(0);
		} else {
			setNextImg(nextImg + 1);
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				{data.images.length > 1 && (
					<div className={styles.pointer} onClick={handleClick}>
						{">"}
					</div>
				)}
				<div className={styles.imageCtrl}>
					<Image
						className={styles.image}
						layout="fill"
						src={data.images[nextImg].url}
						alt="post describing"
					/>
				</div>
				<div className={styles.content}>
					<div className={styles.title}>
						{user && user.userObj?._id === data.user._id && (
							<Image
								src="/tdicon.png"
								layout="responsive"
								width={10}
								height={10}
								className={styles.icon}
								alt="icon"
								onClick={() => showMenu(!menu)}
							/>
						)}
						{menu && (
							<div className={styles.dropdown}>
								<Link
									href={{
										pathname: `/elpers/${data._id}/edit`,
										query: data._id,
									}}
									passHref
								>
									<div className={styles.dropDownItem}>Edit</div>
								</Link>
								<Link href={`/elpers/${data._id}/upload`} passHref>
									<div className={styles.dropDownItem}>Upload Images</div>
								</Link>
							</div>
						)}

						<h5>
							{data.title} By {data.user.username}{" "}
						</h5>
					</div>

					<div className={styles.textContent}>{data.description}</div>
					<div className={styles.bottom}>
						<div className={styles.price}>
							AVG Price:{" "}
							<span className={styles.muted}>
								{data.price}
								<strong>₹</strong>
							</span>
						</div>
						<div className={styles.location}>
							ElpCamp Location:{" "}
							<span className={styles.muted}>{data.location}</span>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.map}>{children}</div>
			<div className={styles.reviews}>
				<h5 className={styles.title}>Reviews</h5>
				{user && <ReviewForm id={data._id} />}
				{data.review.map((el, i) => (
					<ReviewDetails data={el} key={i} mutate={mutate} />
				))}
			</div>
		</div>
	);
}
export default CampDetails;
