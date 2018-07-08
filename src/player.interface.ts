export interface IPlayer
{
    hit(enemy: IPlayer): void
    damage(damage: number): void
}