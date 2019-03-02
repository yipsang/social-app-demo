export interface PaginatorType<T> {
    next(): Promise<T[]>;
    isEnd: boolean;
    cursor: number;
    pageSize: number;
    paginatedAPICall(cursor: number, limit: number): Promise<T[]>;
}

export class Paginator<T> implements PaginatorType<T> {
    isLoading = false;
    isEnd = false;
    cursor = 0;
    pageSize = 0;
    paginatedAPICall = (_c: number, _l: number) => Promise.resolve([] as T[]);

    constructor(
        paginatedAPICall: (cursor: number, limit: number) => Promise<T[]>,
        pageSize: number
    ) {
        this.isLoading = false;
        this.isEnd = false;
        this.cursor = 0;
        this.pageSize = pageSize;
        this.paginatedAPICall = paginatedAPICall;
    }

    async next(): Promise<T[]> {
        if (this.isEnd || this.isLoading) {
            return Promise.resolve([]);
        }
        this.isLoading = true;
        return this.paginatedAPICall(this.cursor, this.pageSize).then(data => {
            this.cursor += this.pageSize;
            if (data.length < this.pageSize) {
                this.isEnd = true;
            }
            this.isLoading = false;
            return data;
        });
    }
}
