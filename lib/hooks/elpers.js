import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

export function getElpers() {
	const { data, mutate } = useSWR("/api/elpers", fetcher);
	const loading = !data;
	return [data, { mutate, loading }];
}

export function getElpersById(id) {
	const { data, mutate } = useSWR(`/api/elpers/${id}`, fetcher);
	const loading = !data;
	return [data, { mutate, loading }];
}
