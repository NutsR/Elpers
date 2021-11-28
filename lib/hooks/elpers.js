import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

export function useGetElpers() {
	const { data, mutate } = useSWR("/api/elpers", fetcher);
	const loading = !data;
	return [data, { mutate, loading }];
}

export function useElpersById(id) {
	const { data, mutate } = useSWR(`/api/elpers/${id}`, fetcher);
	const loading = !data;
	return [data, { mutate, loading }];
}
