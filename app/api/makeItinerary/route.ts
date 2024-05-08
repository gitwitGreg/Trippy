import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { connectToDb } from "@/app/mongo";
import { currentUser } from "@clerk/nextjs/server";


/**
 * 
 * @param req - Contains new Itinerary name, initial activity, and the trip Id
 * @returns  Success message object
 */


export async function POST (req: NextRequest) {
    
    /** Convert req to json object */
    const body = await req.json();

    //Destructure propreties needed
    const { name, activitity, tripId } = body;

    /** Get current user */
    const user = await currentUser();

    /** reject if no user credentials */
    if(!user){
        return NextResponse.json({error: 'Error finding userId'});
    }

    /** Get user Id */
    const ownerId = user.id;

    try{

        /** Connect to Database */
        await connectToDb();

        /** Create new prisma instance */
        const prisma = new PrismaClient;

        
        /** Check if the name is already in use */
        const usedName = await prisma.itinerary.findFirst({
            where: {
                name: name
            }
        })

        /** If name is used return error and reject request */
        if(usedName){

            return NextResponse.json({error: 'Itinerary name already in use'})

        }

        /** create activity object to pass */
        const firstActivity = {
            name: activitity.name,
            cost: activitity.cost,
            location: activitity.location,
            owner: ownerId,
        }

        
        /** Create a new Itinerary */
        
        const newItinerary = await prisma.itinerary.create({
            data: {
                name: name,
                activities: {create: [firstActivity]},
                tripId: tripId,
            }

        });

        /** If theres an error creating return error message */
        if(!newItinerary){

            console.log('error making from our api')
            return NextResponse.json({error: 'Error creating new Itinerary'});

        }

        /** Return Itinerary */
        return NextResponse.json(newItinerary);

    }catch(error){

        /** Handle errors */
        return NextResponse.json({error: 'Error'});
        
    }

}