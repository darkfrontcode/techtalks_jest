export function loopThrough(size: number): Array<number>
{
    return Array.from({length: size}, (x, i) => i)
}