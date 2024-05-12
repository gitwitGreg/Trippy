import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

/**
 * 
 * @param req - string of trip id
 * @returns - array of activities
 */

export async function POST(req: NextRequest) {

    /** Convert request to json data */
    const body = await req.json();

    /** Create prisma instance */
    const prisma = new PrismaClient;

    try{

        /** Find itinerary with provided id */
        const itinerary = await prisma.itinerary.findFirst({
            where: {
                tripId: body
            }
        })

        /** Return error if trip id is not associated with an itinerary */
        if(!itinerary){

            console.log("Unable to find trip");;

            return NextResponse.json({error: "Unable to find trip"});
        }

        /** Find itinerary id  */
        const itinId = itinerary.id;

        /** Find activities */
        const activities = await prisma.activity.findMany({
            where: {
                itineraryId: itinId
            }
        });

        /** If no resutls then there is no activities associated */
        if(!activities){

            console.log("No activities found");

            return NextResponse.json({error: "No activities found"});
            
        }

        /** Return activities */
        return NextResponse.json(activities);


    }catch(error){

        /** Handle errors */
        console.log(error);

        return NextResponse.json({error: error});
    }
}