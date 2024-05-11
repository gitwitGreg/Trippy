import { NextRequest, NextResponse } from "next/server";

/**
 * 
 * @param req - String with place ID for api call
 * @returns  - Json hotel object
 */

export async function POST (req: NextRequest) {

    /** Convert request to json */
    const body = await req.json();

    /** Get api key */
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_PUBLISHABLE_KEY 

    /** Construct uri */
    const uri = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${body}&key=${key}`

    try{

        /** Make request */
        const response = await fetch(uri, {
            method: 'POST'
        });

        /** Reject if invalid place id */
        if(!response.ok){

            const error = await response.json();

            console.log(error)

            return NextResponse.json(error);
        }

        /** Handle hotel response Object */
        const data = await response.json();

        return NextResponse.json(data.result);


    }catch(error){

        /** Handle errors */
        console.log(error);

        return NextResponse.json({error: error});

    }
}