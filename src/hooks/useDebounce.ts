import { useEffect, useMemo, useRef } from 'react';

/**
 *
 * @param callback function to be called after delay
 * @param delay amount of time before calling function
 * @returns debounce function that limits a function call rate
 */
export const useDebounceCallback = <T>(
    callback: (value: T) => void,
    delay: number = 500,
) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const debouncedFn = useMemo(
        () => (value: T) => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                callback(value);
            }, delay);
        },
        [callback, delay],
    );

    useEffect(
        () => () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        },
        [],
    );

    return debouncedFn;
};
