export function toQueryString(params: { [key: string]: any }): string {
    const str = Object.keys(params).map(k => {
        return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
    });
    return str.join("&");
}
