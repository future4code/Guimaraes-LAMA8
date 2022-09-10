import { Show } from "../model/Show"

export interface ShowRepository {
    addShow (input: Show): Promise<void>
    getShowByDay (day: string): Promise<Show[]>
}