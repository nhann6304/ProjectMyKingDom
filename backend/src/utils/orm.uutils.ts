import { Repository, SelectQueryBuilder } from "typeorm";
import { calculatorSkipPage } from "./caculator.utils";
import { CONST_VAL } from "src/constants/value.contants";
import { start } from "repl";
import { IRange } from "src/interfaces/common/IFilterAction.interface";

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

    where(filter: Partial<Record<keyof T, string | number | IRange>>): this {
        let isFirstQuery = true;

        for (const key in filter) {
            const value = filter[key];
            if (value !== undefined && value !== null) { // Kiểm tra null và undefined
                if (typeof value === "object") {
                    const arr = [value.min, value.max];
                    this.queryBuilder.andWhere(
                        `${this.aliasName}.${key} BETWEEN :${key}_start AND :${key}_end`,
                        { [`${key}_start`]: arr[0], [`${key}_end`]: arr[1] }
                    );
                } else {
                    if (isFirstQuery) {
                        this.queryBuilder.where(
                            `${this.aliasName}.${key} = :${key}`,
                            { [key]: value }
                        );
                        isFirstQuery = false;
                    } else {
                        this.queryBuilder.andWhere(
                            `${this.aliasName}.${key} = :${key}`,
                            { [key]: value }
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
            calculatorSkipPage({ limit, page })
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