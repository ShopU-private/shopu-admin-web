export function formatPrice(num: number): number | string{
    if(Number.isInteger(num)){
        return num;
    }
    return num.toFixed(2);
}