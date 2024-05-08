
export interface LocationObject{
    latitude: number | null,
    longitude: number | null
}

export interface Trip{
    id: string,
    title: string,
    location: string,
    members: string[],
    beginingDate: string,
    endDate: string
}