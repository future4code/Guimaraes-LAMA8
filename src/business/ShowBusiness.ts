import { CustomError } from "../error/CustomError";
import { Show, ShowData, ShowInputDTO } from "../model/Show";
import { IdGenerator } from "../services/IdGenerator";
import { ShowRepository } from "./ShowRepository";
import { Authenticator } from "../services/Authenticator";

export class ShowBusiness {
    constructor (
        private ShowDatabase: ShowRepository
    ) {}

    public addShow = async (input: ShowInputDTO) => {
        try {
            const { weekDay, startTime, endTime, bandId, token } = input

            if (!weekDay || !startTime || !endTime || !bandId) {
                throw new CustomError(406,'Invalid Request, must inform "weekDay", "startTime", "endTime" and "bandId')
            }
    
            let newWeekDay = weekDay.toLowerCase()
    
            if (newWeekDay === 'sabado') {
                newWeekDay = 'sábado'
            }
    
            if (newWeekDay !== 'sexta' && newWeekDay !== 'sábado' && newWeekDay !== 'domingo') {
                throw new CustomError(406, '"WeekDay" can only be "sexta", "sábado" or "domingo"')
            }

            if (startTime < 8 || startTime > 23 || endTime < 8 || endTime > 23) {
                throw new CustomError(406, 'Shows can only be scheduled between 8h and 23h')
            }

            if (!Number.isInteger(startTime) || !Number.isInteger(endTime)) {
                throw new CustomError(406, 'Show times must be integer numbers')
            }

            if (startTime < 0 || endTime < 0) {
                throw new CustomError(406, 'Show times must be positives')
            }
            
            if (startTime > endTime) {
                throw new CustomError(406, 'End time can not be earlier than start time')
            }

            const showsInDay = await this.ShowDatabase.getShowByDay(newWeekDay)

            const startTimeShows = showsInDay.map(show => {
                return show.start_time
            })

            if (startTimeShows.includes(startTime)) {
                throw new CustomError(406, 'There is already a show booked at this time in this day')
            }

            new Authenticator().getData(token)

            const id = new IdGenerator().generate()

            const show: Show = {
                id,
                weekDay: newWeekDay,
                startTime,
                endTime,
                bandId
            }

            await this.ShowDatabase.addShow(show)
        }
        
        catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }

    }

    public getShowbyDay = async (day: string): Promise<ShowData[]> => {
        try {
            if (!day) {
                throw new CustomError(406,'Invalid Request, must inform the "day"')
            }

            let newDay = day.toLowerCase()
    
            if (newDay === 'sabado') {
                newDay = 'sábado'
            }
    
            if (newDay !== 'sexta' && newDay !== 'sábado' && newDay !== 'domingo') {
                throw new CustomError(406, '"WeekDay" can only be "sexta", "sábado" or "domingo"')
            }
    
            return await this.ShowDatabase.getShowByDay(newDay)
        }

        catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

}