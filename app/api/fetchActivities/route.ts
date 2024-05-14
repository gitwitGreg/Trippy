import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { connectToDb } from "@/app/mongo";
import { currentUser } from "@clerk/nextjs";

/**
 * 
 * @returns Array of activities from a new trip
 */

export async function POST(req: NextRequest) {
    
    /** Convert request to json */
    const body = await req.json();

    /** Connect to database */
    await connectToDb();

    /** Create prisma instance */
    const prisma = new PrismaClient;

    try{

        /** Query for list of activities based on the itinerary id */
        const itinerary = await prisma.itinerary.findFirst({
            where: {
                tripId: body
            }
        });

        /** If no itinerary found throw error */
        if(!itinerary){

            return NextResponse.json({error: 'No itenarary found'});

        }

        /** Find activities */
        const activities = await prisma.activity.findMany({
            where: {
                itineraryId: itinerary.id
            }
        })

        /** If theres is no activities found return a status of 404 */
        if(!activities){{

            console.log('No itinerary with provided id');

            return NextResponse.json({status: 404});

        }}

        /** Rerurn the itinerary */
        return NextResponse.json(activities);

    }catch(error){

        /** Handle errors */
        console.log(error)

        return NextResponse.json({error : error})

    }


}