import { ShowRepository } from "../business/ShowRepository";
import { Show } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase implements ShowRepository {

    private static TABLE_NAME = "lama_show";

    public addShow = async ({
        id,
        weekDay,
        startTime,
        endTime,
        bandId
    }: Show): Promise<void> => {
        try {
            await this.getConnection()
            .insert({
                id,
                week_day: weekDay,
                start_time: startTime,
                end_time: endTime,
                band_id: bandId
            })
            .into(ShowDatabase.TABLE_NAME)
        }

        catch (error: any) {
            throw new Error(error.sqlMessage)
        }
        
    }

    public getShowByDay = async (day: string): Promise<Show[]> => {
        try {
            const result = await this.getConnection()
            .select('*')
            .from(ShowDatabase.TABLE_NAME)
            .where({ week_day: day })
    
            return result
        }
        
        catch (error: any) {
            throw new Error(error.sqlMessage)
        }

    }
}