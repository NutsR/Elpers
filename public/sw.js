if (!self.define) {
	const e = (e) => {
			"require" !== e && (e += ".js");
			let s = Promise.resolve();
			return (
				n[e] ||
					(s = new Promise(async (s) => {
						if ("document" in self) {
							const n = document.createElement("script");
							(n.src = e), document.head.appendChild(n), (n.onload = s);
						} else importScripts(e), s();
					})),
				s.then(() => {
					if (!n[e]) throw new Error(`Module ${e} didn’t register its module`);
					return n[e];
				})
			);
		},
		s = (s, n) => {
			Promise.all(s.map(e)).then((e) => n(1 === e.length ? e[0] : e));
		},
		n = { require: Promise.resolve(s) };
	self.define = (s, t, a) => {
		n[s] ||
			(n[s] = Promise.resolve().then(() => {
				let n = {};
				const i = { uri: location.origin + s.slice(1) };
				return Promise.all(
					t.map((s) => {
						switch (s) {
							case "exports":
								return n;
							case "module":
								return i;
							default:
								return e(s);
						}
					})
				).then((e) => {
					const s = a(...e);
					return n.default || (n.default = s), n;
				});
			}));
	};
}
define("./sw.js", ["./workbox-4a677df8"], function (e) {
	"use strict";
	importScripts(),
		self.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{
					url: "/_next/server/middleware-manifest.json",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/chunks/2c796e83-8b9f87ea34a5c76a.js",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/chunks/455-1ef024585934ace3.js",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/chunks/748-87de2464b07aa933.js",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/chunks/framework-0f8b31729833af61.js",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/chunks/main-3eb9da52afa4ff4c.js",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/chunks/pages/_app-837c1f2105dd44ba.js",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/chunks/pages/_error-2280fa386d040b66.js",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/chunks/pages/elpers-71bb0b576e471da7.js",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/chunks/pages/elpers/%5Bid%5D-9a1b902a15878850.js",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/chunks/pages/elpers/%5Bid%5D/edit-f9320255d2c17b2a.js",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/chunks/pages/elpers/create-3286c3d0d6e26375.js",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/chunks/pages/index-dbeace9fff1a09f3.js",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/chunks/webpack-b927671265afed5e.js",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/css/5567514fe9eb0b72.css",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/css/689865177dfbf397.css",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/css/8e17f71629adaf70.css",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/css/a1aa836a92dde736.css",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/css/e36e9ca00e00d53e.css",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/zF5Pkvl-0BLePxzyJj0nD/_buildManifest.js",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/zF5Pkvl-0BLePxzyJj0nD/_middlewareManifest.js",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{
					url: "/_next/static/zF5Pkvl-0BLePxzyJj0nD/_ssgManifest.js",
					revision: "zF5Pkvl-0BLePxzyJj0nD",
				},
				{ url: "/favicon.ico", revision: "c30c7d42707a47a3f4591831641e50dc" },
				{
					url: "/pin256x256.png",
					revision: "9bb6a95c6ca1f8a4d6808006c990fd17",
				},
				{ url: "/vercel.svg", revision: "26bf2d0adaf1028a4d4c6ee77005e819" },
			],
			{ ignoreURLParametersMatching: [] }
		),
		e.cleanupOutdatedCaches(),
		e.registerRoute(
			"/",
			new e.NetworkFirst({
				cacheName: "start-url",
				plugins: [
					{
						cacheWillUpdate: async ({
							request: e,
							response: s,
							event: n,
							state: t,
						}) =>
							s && "opaqueredirect" === s.type
								? new Response(s.body, {
										status: 200,
										statusText: "OK",
										headers: s.headers,
								  })
								: s,
					},
				],
			}),
			"GET"
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
			new e.CacheFirst({
				cacheName: "google-fonts-webfonts",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
			new e.StaleWhileRevalidate({
				cacheName: "google-fonts-stylesheets",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-font-assets",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-image-assets",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\/_next\/image\?url=.+$/i,
			new e.StaleWhileRevalidate({
				cacheName: "next-image",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:mp3|wav|ogg)$/i,
			new e.CacheFirst({
				cacheName: "static-audio-assets",
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:mp4)$/i,
			new e.CacheFirst({
				cacheName: "static-video-assets",
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:js)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-js-assets",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:css|less)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-style-assets",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\/_next\/data\/.+\/.+\.json$/i,
			new e.StaleWhileRevalidate({
				cacheName: "next-data",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:json|xml|csv)$/i,
			new e.NetworkFirst({
				cacheName: "static-data-assets",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1;
				const s = e.pathname;
				return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
			},
			new e.NetworkFirst({
				cacheName: "apis",
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1;
				return !e.pathname.startsWith("/api/");
			},
			new e.NetworkFirst({
				cacheName: "others",
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			({ url: e }) => !(self.origin === e.origin),
			new e.NetworkFirst({
				cacheName: "cross-origin",
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
				],
			}),
			"GET"
		);
});
