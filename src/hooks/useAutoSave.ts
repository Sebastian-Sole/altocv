import { useCallback, useEffect, useRef } from "react";

export function useAutoSave<T>(
	data: T,
	onSave: (data: T) => void,
	delay = 1000,
) {
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const latestData = useRef(data);
	const lastSavedSnapshot = useRef(JSON.stringify(data));

	latestData.current = data;

	useEffect(() => {
		const snapshot = JSON.stringify(data);
		if (snapshot === lastSavedSnapshot.current) {
			return;
		}

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			const currentSnapshot = JSON.stringify(latestData.current);
			if (currentSnapshot !== lastSavedSnapshot.current) {
				lastSavedSnapshot.current = currentSnapshot;
				onSave(latestData.current);
			}
		}, delay);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [data, onSave, delay]);

	const saveNow = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		lastSavedSnapshot.current = JSON.stringify(latestData.current);
		onSave(latestData.current);
	}, [onSave]);

	return { saveNow };
}
