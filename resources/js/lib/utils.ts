import { usePage } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function useQueryParams(key?: string) {
    const query = (usePage().props.ziggy as Record<string, any>).query;

    // Return the entire query object if no key is provided, else return the specific key
    return key ? query[key] : query;
}

export function appendQueryParams(
    url: string,
    params: Record<string, any>,
    ignoreKey?: string,
): string {
    if (!url) return url;
    const [baseUrl, queryString] = url.split('?');

    const existingParams = new URLSearchParams(queryString || '');

    // Add new params or overwrite existing ones
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            if (ignoreKey === key) {
                return;
            }
            existingParams.set(key, value.toString());
        }
    });

    // Rebuild the URL
    return `${baseUrl}?${existingParams.toString()}`;
}
