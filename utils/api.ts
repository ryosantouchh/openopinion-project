const baseUrl = "http://127.0.0.1:9099/api/v1";

export function buildUrl(path: string) {
    return `${baseUrl}/${path}`;
}
