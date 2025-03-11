import { Repository, SelectQueryBuilder } from 'typeorm';
import { CONST_VAL } from 'src/constants/value.contants';
import { start } from 'repl';
import { IRange } from 'src/interfaces/common/IFilterAction.interface';
import { UtilConvert } from './convert.ultils';
import { UtilCalculator } from './caculator.utils';

export class UtilORM<T> {
    private queryBuilder: SelectQueryBuilder<T>;
    constructor(
        repo: Repository<T>,
        private aliasName: string,
    ) {
        this.queryBuilder = repo.createQueryBuilder(aliasName);
    }

    leftJoinAndSelect(fields: Array<keyof T>): this {
        for (const field of fields) {
            const relationPath = `${this.aliasName}.${String(field)}`;
            this.queryBuilder.leftJoinAndSelect(relationPath, String(field));
        }
        return this;
    }

    where(
        filter: Partial<Record<keyof T, string | number | IRange>>,
        isDeleted: string,
    ): this {
        const isDelete = UtilConvert.convertStringToBoolean(isDeleted); // Chuyển đổi giá trị isDeleted

        // Bắt đầu truy vấn với điều kiện isDeleted
        this.queryBuilder.where(`${this.aliasName}.isDeleted = :isDelete`, {
            isDelete,
        });

        for (const key in filter) {
            const value = filter[key];

            if (value !== undefined && value !== null) {
                if (typeof value === 'object' && 'min' in value && 'max' in value) {
                    const { min, max } = value as IRange;
                    this.queryBuilder.andWhere(
                        `${this.aliasName}.${key} BETWEEN :${key}_start AND :${key}_end`,
                        { [`${key}_start`]: min, [`${key}_end`]: max },
                    );
                } else {
                    // Trường hợp giá trị bình thường string | number
                    this.queryBuilder.andWhere(`${this.aliasName}.${key} = :${key}`, {
                        [key]: value,
                    });
                }
            }
        }

        return this;
    }

    whereUser(userId: string): this {
        this.queryBuilder.where('cart.cart_users.id = :userId', { userId });

        return this;
    }

    select(fields: Array<T> = [], fieldOption: Array<string> = []): this {
        let arrFields: Array<string> = [];
        arrFields.push(`${this.aliasName}.id`);

        // fieldOption là các trường k dính tới bảng này
        for (let f = 0; f < fieldOption.length; f++) {
            arrFields.push(fieldOption[f]);
        }

        if (Array.isArray(fields)) {
            for (let i = 0; i < fields.length; i++) {
                arrFields.push(`${this.aliasName}.${fields[i]}`);
            }
        } else {
            arrFields.push(`${this.aliasName}.${fields}`);
        }

        this.queryBuilder.select(arrFields);

        return this;
    }

    skip({ page, limit }: { page: number; limit: number }): this {
        this.queryBuilder.skip(UtilCalculator.calculatorSkipPage({ limit, page }));
        return this;
    }

    take({ limit }: { limit: number }): this {
        this.queryBuilder.take(limit || CONST_VAL.LIMIT_DEFAULT);
        return this;
    }

    build() {
        return this.queryBuilder;
    }
}
