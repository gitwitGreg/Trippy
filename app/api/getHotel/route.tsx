import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    /** Convert request to json */
    const body = await req.json();

    /** Get api key*/
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_PUBLISHABLE_KEY;

    /** Contruct query */
    const query = `hotels in ${body}`

    /** Create api uri */
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${key}`;

    try{

        /** Make request */
        const response = await fetch(url, {
            method: 'POST',
        })

        /** Reject if invalid response */
        if(!response.ok){

            const error = await response.json();

            console.log(error);

            return NextResponse.json({error: error});
        }

        /** Get hotels as json */
        const data = await response.json();

        /** Return hotel list */
        return NextResponse.json(data.results);

    }catch(error){

        /** Handle errors */

        console.log(error)

        return NextResponse.json({error: error});
    }
}