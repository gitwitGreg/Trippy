import { connectToDb } from '@/app/mongo';
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';


export async function GET () {

    const prisma =  new PrismaClient;

    if(!prisma){
        console.log('primsa connection failed');
    }

    try{

        await connectToDb();

        await prisma.$connect();

        const user = await currentUser();

        if(!user){
            console.log('couldnt find current user');
            return NextResponse.json({error: 'couldnt find current user'});
        }

       
        const trips = await prisma.trips.findMany({
            where: {
                owner: user.id
            }
        });

        if(!trips){
            console.log('we didnt get the trips');
            return NextResponse.json({error: 'Did not find trips in db'});
        }

        return NextResponse.json(trips);

    }catch(error){

        console.log(error);

        return NextResponse.json({error: error})

    }
}