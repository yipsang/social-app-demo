export interface PaginatorType<T> {
    next(): Promise<T[]>;
    isEnd: boolean;
    cursor: number;
    pageSize: number;
    paginatedAPICall(cursor: number, limit: number): Promise<T[]>;
}

export class Paginator<T> implements PaginatorType<T> {
    isEnd = false;
    cursor = 0;
    pageSize = 0;
    paginatedAPICall = (_c: number, _l: number) => Promise.resolve([] as T[]);

    constructor(
        paginatedAPICall: (cursor: number, limit: number) => Promise<T[]>,
        pageSize: number
    ) {
        this.isEnd = false;
        this.cursor = 0;
        this.pageSize = pageSize;
        this.paginatedAPICall = paginatedAPICall;
    }

    async next(): Promise<T[]> {
        if (this.isEnd) {
            return Promise.resolve([]);
        }
        return this.paginatedAPICall(this.cursor, this.pageSize).then(data => {
            this.cursor += this.pageSize;
            if (data.length < this.pageSize) {
                this.isEnd = true;
            }
            return data;
        });
    }
}
