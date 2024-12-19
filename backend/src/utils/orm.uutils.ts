import { Repository, SelectQueryBuilder } from "typeorm";
import { CONST_VAL } from "src/constants/value.contants";
import { start } from "repl";
import { IRange } from "src/interfaces/common/IFilterAction.interface";
import { UtilConvert } from "./convert.ultils";
import { UtilCalculator } from "./caculator.utils";

export class UtilORM<T> {
    private queryBuilder: SelectQueryBuilder<T>;
    constructor(
        repo: Repository<T>,
        private aliasName: string
    ) {
        this.queryBuilder = repo.createQueryBuilder(aliasName);
    }

    leftJoinAndSelect(fields: Array<keyof T>): this {
        let arrFields: Array<string> = [];
        for (let i = 0; i < fields.length; i++) {
            arrFields.push(String(fields[i]));
            this.queryBuilder.leftJoinAndSelect(
                `${this.aliasName}.${String(fields[i])}`,
                `${String(fields[i])}`)
        }
        return this
    }

    where(filter: Partial<Record<keyof T, string | number | IRange>>, isDeleted: string): this {
        let isFirstQuery = true;
        const isDelete = UtilConvert.convertStringToBoolean(isDeleted); // Chuyển đổi giá trị isDeleted

        for (const key in filter) {
            const value = filter[key];
            if (value !== undefined && value !== null) {
                if (typeof value === "object") {
                    const { min, max } = value as IRange; // Ép kiểu rõ ràng
                    if (min !== undefined && max !== undefined) { // Kiểm tra giá trị min/max
                        if (isFirstQuery) {
                            this.queryBuilder.where(
                                `${this.aliasName}.${key} BETWEEN :${key}_start AND :${key}_end AND ${this.aliasName}.isDeleted = :isDelete`,
                                { [`${key}_start`]: min, [`${key}_end`]: max, isDelete }
                            );
                            isFirstQuery = false;
                        } else {
                            this.queryBuilder.andWhere(
                                `${this.aliasName}.${key} BETWEEN :${key}_start AND :${key}_end AND ${this.aliasName}.isDeleted = :isDelete`,
                                { [`${key}_start`]: min, [`${key}_end`]: max, isDelete }
                            );
                        }
                    }
                } else {
                    if (isFirstQuery) {
                        this.queryBuilder.where(
                            `${this.aliasName}.${key} = :${key} AND ${this.aliasName}.isDeleted = :isDelete`,
                            { [key]: value, isDelete }
                        );
                        isFirstQuery = false;
                    } else {
                        this.queryBuilder.andWhere(
                            `${this.aliasName}.${key} = :${key} AND ${this.aliasName}.isDeleted = :isDelete`,
                            { [key]: value, isDelete }
                        );
                    }
                }
            }
        }

        return this;
    }




    select(fields: Array<T> = []): this {
        let arrFields: Array<string> = [];
        arrFields.push(`${this.aliasName}.id`);
        if (Array.isArray(fields)) {
            for (let i = 0; i < fields.length; i++) {
                arrFields.push((`${this.aliasName}.${fields[i]}`))
            }
        } else {
            arrFields.push(`${this.aliasName}.${fields}`)
        }

        this.queryBuilder.select(arrFields)

        return this
    }

    skip({ page, limit }: { page: number, limit: number }): this {
        this.queryBuilder.skip(
            UtilCalculator.calculatorSkipPage({ limit, page })
        );
        return this;
    }

    take({ limit }: { limit: number }): this {
        this.queryBuilder.take(limit || CONST_VAL.LIMIT_DEFAULT)
        return this;
    }

    build() {
        return this.queryBuilder
    }
}