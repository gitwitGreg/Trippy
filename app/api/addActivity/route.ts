import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/app/mongo";
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs";


/**
 * 
 * @param req - The credentials needed to create a new activity
 * @param parameters -  Contain name, cost, and location of the activity
 * @returns An object with a success message and status
 */


export async function POST (req: NextRequest) {
    /** convert req into json */
    const body = await req.json();

    /** Destructured all the proprities from request */
    const { name, cost, location, itinerary } = body;

    /**Connect to database */
    await connectToDb();

    /**Create prisma instance */
    const prisma = new PrismaClient;

    /** Get the current users user Id */
    const user = await currentUser();

    /** If error finding user then reject request */
    if(!user){

        console.log('error finding user');

        return NextResponse.json({error: 'Error finding user'});

    }

    /** Find current users Id */
    const userId = user.id;

    try{

        /**Search to see if itinerary exists */
        const activeName = await prisma.itinerary.findFirst({
            where: {
                name: itinerary
            }
        });

        /**Rejects request if initenary doesnt exist */
        if(!activeName){
            return NextResponse.json({error: 'No itinerary with that name'});
        }

        /**Create new activity */
        const newActivity = await prisma.activity.create({
            data: {
                name: name,
                cost: cost,
                location: location,
                itinerary: itinerary,
                owner: userId,
            }
        })
        
        /**If error creating new activty return an error */
        if(!newActivity){

            console.log('error adding to database');

            return NextResponse.json({error: 'error adding to database'});

        }

        /**Return object with status and message upon creation */
        return NextResponse.json({
            status: 'success',
            message: 'New acivity created successfully'
        });

    }catch(error){

        /**catch errors */
        console.log(error);
        
        return NextResponse.json({error: error});
    }
}