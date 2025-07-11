import { useCallback, useEffect, useState } from "react";

type UseFetchOptions = {
	autoRefetch?: boolean;
};

const useFetch = <T>(
	fetchFunction: () => Promise<T>,
	options: UseFetchOptions = {},
) => {
	const { autoRefetch = true } = options;
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const result = await fetchFunction();
			setData(result);
		} catch (error) {
			setError(error instanceof Error ? error.message : "An error occurred");
		} finally {
			setIsLoading(false);
		}
	}, [fetchFunction]);

	const reset = () => {
		setData(null);
		setError(null);
		setIsLoading(false);
	};

	useEffect(() => {
		if (autoRefetch) {
			fetchData();
		}
	}, [autoRefetch, fetchData]);

	return { data, isLoading, error, refetch: fetchData, reset };
};

export default useFetch;
