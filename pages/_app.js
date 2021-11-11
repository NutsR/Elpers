import "../styles/globals.css";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
const Layout = ({ children }) => {
	return (
		<div className="layout">
			<Header />
			{children}
			<Footer />
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
