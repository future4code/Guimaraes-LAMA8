import { Request, Response } from 'express'
import { ShowBusiness } from '../business/ShowBusiness';
import { ShowInputDTO } from '../model/Show';

export class ShowController {
    constructor (
        private ShowBusiness: ShowBusiness
    ) {}

    public addShow = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: ShowInputDTO = {
                weekDay: req.body.weekDay,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                bandId: req.body.bandId,
                token: req.headers.authorization as string
            }
    
            await this.ShowBusiness.addShow(input)

            res.status(201).send({ message: 'Show booked sucessfully!'})
        }

        catch (error: any) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public getShowByDay = async (req: Request, res: Response): Promise<void> => {
        try {
            const day = req.query.day as string

            const shows = await this.ShowBusiness.getShowbyDay(day)

            res.status(200).send({ shows })
        }

        catch (error: any) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }
}