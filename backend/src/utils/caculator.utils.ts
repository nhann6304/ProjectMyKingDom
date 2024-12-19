
export class UtilCalculator {
    static calculatorSkipPage({ page, limit }: { page: number, limit: number }) {
        const skip = (+page - 1) * +limit;
        return skip
    }

    static calculatorDiscountPrice({ price_item, discount_item }: { price_item: number, discount_item: number }) {
        const result = (price_item * (discount_item / 100))
        return result
    }

}
