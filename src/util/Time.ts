import moment from "moment";

export function prependZero(i: number): string {
    return i < 10 ? "0" + i : i.toString();
}

export function round(time: number): number {
    let m = moment(time);
    const minutes = m.minutes();
    m = m.seconds(0);
    const mod = minutes % 5
    if (mod < 3) m.subtract(mod, 'minutes')
    else m.add(5 - mod, 'minutes')
    return m.valueOf()
}