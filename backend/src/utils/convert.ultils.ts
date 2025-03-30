import { FilterQuery } from 'src/abstracts/common/AFilterAction.abstracts';
import { SortOptions } from 'src/enums/ESort.enum';
import { IQueries } from 'src/interfaces/common/IBaseQueries.interface';
import { IFilter } from 'src/interfaces/common/IFilterAction.interface';

export class UtilConvert {
    static convertStringToBoolean(val: string): boolean {
        const result = val === 'true';
        return result;
    }

    static convertJsonToObject(val: string | { filter: IFilter[] } | IFilter[]): {
        [key: string]: any;
    } {
        let obj: { [key: string]: any } = {};

        if (!val) return obj;

        try {
            if (typeof val === 'string') {
                val = JSON.parse(val);
            }

            if (Array.isArray(val)) {
                val.forEach((item) => {
                    if (item.f && item.v !== undefined) {
                        // Nếu key đã tồn tại, chuyển thành mảng
                        if (obj[item.f]) {
                            obj[item.f] = Array.isArray(obj[item.f])
                                ? [...obj[item.f], item.v]
                                : [obj[item.f], item.v];
                        } else {
                            obj[item.f] = item.v;
                        }
                    }
                });
            } else if (
                typeof val === 'object' &&
                'filter' in val &&
                Array.isArray(val.filter)
            ) {
                val.filter.forEach((item) => {
                    if (item.f && item.v !== undefined) {
                        // Nếu key đã tồn tại, push vào mảng
                        if (obj[item.f]) {
                            obj[item.f] = Array.isArray(obj[item.f])
                                ? [...obj[item.f], item.v]
                                : [obj[item.f], item.v];
                        } else {
                            obj[item.f] = item.v;
                        }
                    }
                });
            }
        } catch (error) {
            console.error('Lỗi khi parse JSON:', error);
        }

        return obj;
    }
    //
    static convertSortToObject<T extends Record<string, any>>(
        val: string | { sort: { field: keyof T; order: SortOptions } },
    ): { field?: keyof T; order?: SortOptions } {
        let obj: { field?: keyof T; order?: SortOptions } = {};

        if (!val) return obj;
        try {
            if (typeof val === 'string') {
                val = JSON.parse(val);
            }

            if (typeof val === 'object' && 'sort' in val) {
                obj = {
                    field: val.sort.field as keyof T,
                    order: val.sort.order as SortOptions,
                };
            }
        } catch (error) {
            console.error('Lỗi khi parse JSON:', error);
        }

        return obj;
    }
}
