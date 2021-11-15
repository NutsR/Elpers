import "../styles/globals.css";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import NProgress from "nprogress";
import Router from "next/router";

NProgress.configure({
	minimum: 1,
	speed: 1500,
	showSpinner: true,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
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
