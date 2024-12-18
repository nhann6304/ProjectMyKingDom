export interface IQueries<T = any> {
    limit?: number;
    page?: number;
    fields?: Array<T>
    isDeleted?: string | boolean;
    // sortBy?: string;
    // sortChildrenBy?: string;
    // sortDir?: string | TDirectionSort;
    // searchBy?: string;
    // searchVal?: string;
    // filterBy?: string;
    // filterVal?: string;
    fieldsWhereSelected?: Array<keyof T> | any;
    fieldsWhereSelectedValue?: Array<string>;
    [key: string]: string | number | boolean | any;
}