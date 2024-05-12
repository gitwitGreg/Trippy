import { connectToDb } from '@/app/mongo';
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';

/**
 * 
 * @returns - Gets all trips user has
 */

export async function GET () {

    /** Create prisma instance */
    const prisma =  new PrismaClient;

    try{

        /** Connect to database */
        await connectToDb();

        /** Connect to prisma */
        await prisma.$connect();

        /** Get current user */
        const user = await currentUser();

        /** If error finding user return error */
        if(!user){
            console.log('couldnt find current user');
            return NextResponse.json({error: 'couldnt find current user'});
        }

       /** Find all trips associated with user */
        const trips = await prisma.trips.findMany({
            where: {
                owner: user.id
            }
        });

        /** If user has no trips return json object with message */
        if(!trips){

            return NextResponse.json({error: 'Did not find trips in db'});

        }

        /** Return users trips */
        return NextResponse.json(trips);

    }catch(error){

        /** Handle errors */

        return NextResponse.json({error: error})

    }
}