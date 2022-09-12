import { ShowBusiness } from "../src/business/ShowBusiness";
import { ShowRepository } from "../src/business/ShowRepository";
import { Show, ShowData, ShowInputDTO } from "../src/model/Show";



class ShowDatabaseMock implements ShowRepository {
    addShow(input: Show): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getShowByDay = async (day: string): Promise<ShowData[]> => {
        const result = [
            {
                id: 'd7907830-f3af-4eca-8060-6602fe9f0eb5',
                week_day: 'sábado',
                start_time: 8,
                end_time: 9,
                band_id: '2',
            },
            {
                id: 'ed50ed9a-ff1b-4463-85f6-7a31cf766936',
                week_day: 'sábado',
                start_time: 10,
                end_time: 11,
                band_id: '1'
            }
        ]

        return result
    }

}

const showDatabase = new ShowDatabaseMock()
const showBusiness = new ShowBusiness(showDatabase)

describe('Testando ShowBusiness', () => {
    test('Caso de erro: Dia da semana não passado', async () => {
        expect.assertions(2)
        try {
            const input: ShowInputDTO = {
                weekDay: '',
                startTime: 15,
                endTime: 16,
                bandId: '1',
                token: 'token'
            }

            await showBusiness.addShow(input)
        }

        catch (error: any) {
            expect(error).toBeDefined()
            expect(error.message).toBe('Invalid Request, must inform "weekDay", "startTime", "endTime" and "bandId')
        }
    })

    test('Caso de erro: Horário já usado', async () => {
        expect.assertions(2)
        try {
            const input: ShowInputDTO = {
                weekDay: 'sabado',
                startTime: 8,
                endTime: 10,
                bandId: '1',
                token: 'token'
            }

            await showBusiness.addShow(input)
        }

        catch (error: any) {
            expect(error).toBeDefined()
            expect(error.message).toBe('There is already a show booked at this time in this day')
        }
    })
})