import { Repository, SelectQueryBuilder } from "typeorm";
import { calculatorSkipPage } from "./caculator.utils";
import { CONST_VAL } from "src/constants/value.contants";

export class UtilORM<T> {
    private queryBuilder: SelectQueryBuilder<T>;
    constructor(
        repo: Repository<T>,
        private aliasName: string
    ) {
        this.queryBuilder = repo.createQueryBuilder(aliasName);
    }

    select(fields: Array<T> = []) {
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

    leftJoinAndSelect(fields: Array<keyof T>) {
        let arrFields: Array<string> = [];
        for (let i = 0; i < fields.length; i++) {
            arrFields.push(String(fields[i]));
            this.queryBuilder.leftJoinAndSelect(
                `${this.aliasName}.${String(fields[i])}`,
                `${String(fields[i])}`)
        }
        console.log(arrFields);
        return this
    }

    skip({ page, limit }: { page: number, limit: number }) {
        this.queryBuilder.skip(
            calculatorSkipPage({ limit, page })
        );
        return this;
    }

    take({ limit }: { limit: number }) {
        this.queryBuilder.take(limit || CONST_VAL.LIMIT_DEFAULT)
        return this;
    }

    build() {
        return this.queryBuilder
    }
}