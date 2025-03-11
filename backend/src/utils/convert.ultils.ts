import { FilterQuery } from "src/abstracts/common/AFilterAction.abstracts";
import { IQueries } from "src/interfaces/common/IBaseQueries.interface"
import { IFilter } from "src/interfaces/common/IFilterAction.interface"


export class UtilConvert {
    static convertStringToBoolean(val: string): boolean {
        const result = val === "true"
        return result
    }

    static convertJsonToObject(
        val: string | { filter: IFilter[] } | IFilter[] | FilterQuery[]
    ): Record<string, any> {
        let obj: Record<string, any> = {};

        if (!val) return obj; // Nếu null hoặc undefined, trả về object rỗng

        try {
            // Nếu val là JSON string thì parse
            if (typeof val === "string") {
                val = JSON.parse(val);
            }

            // Nếu val là object có key `filter`
            if (typeof val === "object" && !Array.isArray(val) && "filter" in val) {
                val = val.filter;
            }

            // Nếu val là mảng FilterQuery[], chuyển về IFilter[]
            if (Array.isArray(val)) {
                obj = val.reduce((acc, item) => {
                    // Kiểm tra nếu item là instance của FilterQuery thì chuyển đổi
                    const field = (item as any).f || (item as any)["field"]; // Kiểm tra field có thể có 2 dạng
                    const value = (item as any).v || (item as any)["value"];

                    if (field && value !== undefined) {
                        acc[field] = value;
                    }
                    return acc;
                }, {} as Record<string, any>);
            }
        } catch (error) {
            console.error("Lỗi khi parse JSON:", error);
        }

        return obj;
    }
}

