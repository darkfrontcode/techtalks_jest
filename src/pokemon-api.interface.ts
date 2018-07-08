export interface IPokemonAPI
{
    name: string
    stats: [
        {
            stat: {
                url: string
                name: string
            },
            effort: number,
            base_stat: number
        }
    ]
    moves: [
        {
            move: {
                url: string
                name: string
            }
        }
    ]
}