import { Show, ShowData } from "../model/Show"

export interface ShowRepository {
    addShow (input: Show): Promise<void>
    getShowByDay (day: string): Promise<ShowData[]>
}