

export const calculatorSkipPage = ({ page, limit }: { page: number, limit: number }) => {
    const skip = (+page - 1) * +limit;
    console.log("skip:::", skip);
    return skip
}