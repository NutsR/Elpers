import styles from "./profileOpts.module.scss";
function ProfileOpts({ showProfile, mutate }) {
	const handleLogout = async () => {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_DOMAIN || ""}/api/user/logout`,
			{
				method: "POST",
			}
		);
		if (res.status === 204) {
			showProfile(false);
			mutate(null);
		}
	};
	return (
		<div className={styles.dropDown}>
			<span onClick={handleLogout}>Logout</span>
		</div>
	);
}

export default ProfileOpts;
