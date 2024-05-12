import { NextRequest, NextResponse } from "next/server";

/**
 * 
 * @param req - String of general location
 * @returns - Formatted string address
 */

export async function POST (req: NextRequest){
    
    /** Convert body to json */
    const adress: string = await req.json();
    
    /** Get api key */
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_PUBLISHABLE_KEY;

    /** Return if no adress */
    if(!adress){
        return NextResponse.json({error: 'missing adress'});
    }
    
    /** Construct Uri */
    const reqUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${adress}&key=${key}`

    try{

        /** Make request */
        const locationResponse = await fetch(reqUrl);

        /** If error making request return error */
        if(!locationResponse.ok){

            const error = await locationResponse.json();

            return NextResponse.json({error: error.error_message});
        }
        
        /** Convert response to json */
        const data = await locationResponse.json();
        
        /** Get adress from data object */
        const validAdress = data.results[0];

        /** Return adress */
        return NextResponse.json(validAdress);

    }catch(error){
        
        /** Handle errors */
        return NextResponse.json({error: error});

    }
}