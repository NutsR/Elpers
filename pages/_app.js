import "../styles/globals.css";
import Header from "../components/header/header";
const Layout = ({ children }) => {
	return (
		<div className="layout">
			<Header />
			{children}
		</div>
	);
};

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
