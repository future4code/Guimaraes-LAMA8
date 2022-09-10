export type Show = {
    id: string,
    weekDay: string,
    startTime: number,
    endTime: number,
    bandId: string
}

export type ShowInputDTO = {
    weekDay: string,
    startTime: number,
    endTime: number,
    bandId: string,
    token: string
}