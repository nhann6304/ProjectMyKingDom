import { Repository, SelectQueryBuilder } from "typeorm";
import { calculatorSkipPage } from "./caculator.utils";
import { CONST_VAL } from "src/constants/value.contants";
import { start } from "repl";

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

    where(filter: Partial<Record<keyof T, string | number | [number, number]>>): this {

        let isFirstQuery = true; // Đặt biến ở bên ngoài vòng lặp để kiểm tra lần đầu

        for (let key in filter) {
            const value = filter[key];
            if (value !== undefined) {
                // Kiểm tra nếu giá trị là mảng (ví dụ: cho khoảng giá trị)
                if (Array.isArray(value)) {
                    this.queryBuilder.andWhere(`${this.aliasName}.${key} BETWEEN :start AND :end`, {
                        start: value[0],
                        end: value[1]
                    });
                } else {
                    if (isFirstQuery) {
                        console.log(123);
                        this.queryBuilder.where(`${this.aliasName}.${key} = :value`, { value });
                        isFirstQuery = false;
                    } else {
                        this.queryBuilder.andWhere(`${this.aliasName}.${key} = :value`, { value });
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