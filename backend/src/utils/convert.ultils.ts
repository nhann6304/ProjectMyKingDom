import { IQueries } from "src/interfaces/common/IBaseQueries.interface"
import { IFilter } from "src/interfaces/common/IFilterAction.interface"


export class UtilConvert {
    static convertStringToBoolean(val: string): boolean {
        const result = val === "true"
        return result
    }
    static convertJsonToObject(val: IFilter) {
        let obj: { [key: string]: any } = {};

        if (val !== undefined) {
            const parseObj = JSON.parse(`${val}`) as Partial<IFilter | IFilter[]>;

            if (Array.isArray(parseObj)) {
                for (let key in parseObj) {
                    if (Object.prototype.hasOwnProperty.call(parseObj, key)) {
                        const item = parseObj[key] as IFilter;
                        if (item && item.f && item.v !== undefined) {
                            obj[item.f] = item.v;
                        }
                    }
                }
            } else {
                obj = { [parseObj.f]: parseObj.v };
            }
        }


        return obj;
    }



}
