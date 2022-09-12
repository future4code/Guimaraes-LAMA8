export type Show = {
    id: string,
    weekDay: string,
    startTime: number,
    endTime: number,
    bandId: string
}

export type ShowData = {
    id: string,
    week_day: string,
    start_time: number,
    end_time: number,
    band_id: string
}

export type ShowInputDTO = {
    weekDay: string,
    startTime: number,
    endTime: number,
    bandId: string,
    token: string
}