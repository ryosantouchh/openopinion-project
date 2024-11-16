const baseUrl = "http://localhost:9099/api/v1";

export function buildUrl(path: string) {
    return `${baseUrl}/${path}`;
}
