export default function toFixed(number:number, precision:number):number {
    if (number === 0 || isNaN(number))
        return number;

    var factor = Math.pow(10, precision);

    return Math.round(number * factor) / factor;
}