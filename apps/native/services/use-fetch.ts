import { useEffect, useState } from "react";

export const useFetch = <T>(
	fetchFunction: () => Promise<T>,
	autoRefetch: true,
) => {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async () => {
		try {
			setIsLoading(true);
			setError(error);

			const result = await fetchFunction();
			setData(result);
		} catch (error) {
			setError(error instanceof Error ? error.message : "An error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	const reset = () => {
		setData(null);
		setError(null);
		setIsLoading(false);
	};

	useEffect(() => {
		if (autoRefetch) {
			fetchData();
		}
	}, [autoRefetch]);

	return { data, isLoading, reset, error, refetch: fetchData };
};
