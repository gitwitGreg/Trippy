import { NextResponse, NextRequest } from "next/server";
import { Activity, PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

/**
 * 
 * @returns - array of users recent activities
 */

export async function GET (){

    try{

        /** Create prisma client */
        const prisma = new PrismaClient;

        /** Get user info */
        const currUser =  await currentUser();

        /** Handle instance of no user */
        if(!currUser){

            console.log('no user ');

            return NextResponse.json({error: 'No user information found'});

        }

        /** Find activities user ownes */
        const activities = await prisma.activity.findMany({
            where: {
                owner: currUser.id
            },
            orderBy: {
                createdAt: 'asc'
            },
            
        });
        
        /** Handle instance of user having no activities */
        if(!activities){

            return NextResponse.json({error: 'User has no activities'});

        }

        /** limit activities count to 20 */
        if(activities.length >= 20){

            const recentActivity = activities.slice(0,20);

            return NextResponse.json(recentActivity);

        }

        /** Return Activities*/
        return NextResponse.json(activities);
        

    }catch(error){

        /** Handle errors */
        return NextResponse.json({error: error})

    }
}