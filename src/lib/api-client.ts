type RequestOptions = {
    method?: string;
    params?: Record<string, string | number | boolean | undefined | null>;
};

function buildUrlWithParams(
    url: string,
    params?: RequestOptions['params'],
): string {
    if (!params) return url;
    const filtered = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== undefined && v !== null),
    );
    const queryString = new URLSearchParams(
        filtered as Record<string, string>,
    ).toString();
    return `${url}?${queryString}`;
}

async function fetchApi<T>(
    url: string,
    options: RequestOptions = {},
): Promise<T> {
    const { method = 'GET', params } = options;

    const fullUrl = buildUrlWithParams(`/api/github${url}`, params);

    const response = await fetch(fullUrl, { method });

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return response.json();
}

export const api = {
    get<T>(url: string, options?: RequestOptions): Promise<T> {
        return fetchApi<T>(url, { ...options, method: 'GET' });
    },
};
