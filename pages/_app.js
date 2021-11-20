import "../styles/globals.scss";
import Head from "next/head";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import NProgress from "nprogress";
import Router from "next/router";

NProgress.configure({
	minimum: 0.6,
	speed: 500,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
const Layout = ({ children }) => {
	return (
		<div className="layout">
			<Head>
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
				/>
				<title>ElpCamp</title>
			</Head>
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
