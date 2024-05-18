import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

/**
 * 
 * @param req - string with trip Id
 * @returns json object with latitude and longitude
 */

export async function POST(req: NextRequest) {

    /** Convert request to json */
    const body = await req.json();

    /** Create a prisma instance */
    const prisma = new PrismaClient();

    /** Find trip from Id */
    const trip = await prisma.trips.findFirst({
        where: {
            id: body
        }
    });

    /** Get api key */
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_PUBLISHABLE_KEY;

    /** Reject request if no trip found */
    if(!trip){

        console.log('no trip with provided id');

        return NextResponse.json({error: 'No trip with that id found'});

    }

    /** Get location from trip */
    const location = trip.location;
        
    /** Construct uri */
    const reqUri = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`

    try{

        /** Make api call */
        const response = await fetch(reqUri);

        /** Handle invalid location requests*/
        if(!response.ok){

            const error = await response.json();

            console.log(error);

            return NextResponse.json({error: error});
        }

        /** Get json response data */
        const data = await response.json();

        /** Create coordinates object */
        const coordinateObj = {
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng
        }

        /** Return Object */
        return NextResponse.json(coordinateObj);

    }catch(error){

        /** Handle errors */
        console.log(error)

        return NextResponse.json({error: error})
    }

}