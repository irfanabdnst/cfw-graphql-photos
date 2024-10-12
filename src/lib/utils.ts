export const roundUp = (num: number, precision: number) => {
    const p = 10 ** precision;

    return Math.ceil(num * p) / p;
};
