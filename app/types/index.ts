
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


export interface PlaceDetails {
    adress_components: [],
    adr_address: string,
    business_status: string;
    formatted_phone_number: string,
    goemetry: {
        location: {
            lat: number, 
            lng: number
        }
    },
    location: {
        northeast: {
            lat: number, 
            lng: number
        },
        southwest: {
            lat: number, 
            lng: number
        }
    },
    icon: string,
    icon_background_color: string,
    icon_mask_based_uri: string,
    international_phone_number: string,
    name: string,
    operating_hours: {
        open_now: boolean, 
        periods: [{
            close: {
                day: number, 
                time: string
            }, 
            open:{
                day: number, 
                time: string
            }
        }]
    },
    weekley_text: string[],
    photos: [
        {
            height: number,
            html_attribution: string[],
            width: number,
            html_attributions: string[]
            photo_reference: string
        }
    ],
    rating: number,
    reference : string,
    editorial_summary: {
        language: string,
        overview: string,

    }
    reviews: [{
        author_name: string,
        author_url: string,
        language: string,
        rating: number ,
        relative_time_description: string,
        profile_photo_url: string,
        text: string,
        time: number
    }],
    types: string[],
    url: string,
    user_ratings_total: number,
    vinicity: string,
    webstite: string
}