export interface IQueries<T = any> {
    limit?: number;
    page?: number;
    fields?: Array<T>
    isDeleted: string
    // sortBy?: string;
    // sortChildrenBy?: string;
    // sortDir?: string | TDirectionSort;
    // searchBy?: string;
    // searchVal?: string;
    // filterBy?: string;
    // filterVal?: string;
    // isDeleted?: string | boolean;
    fieldsSelected?: Array<keyof T> | any;
    [key: string]: string | number | boolean | any;
}