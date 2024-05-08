import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest, res: NextResponse){
    const adress: string = await req.json();
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_PUBLISHABLE_KEY;

    if(!adress){
        return NextResponse.json({error: 'missing adress'});
    }
    const reqUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${adress}&key=${key}`

    try{
        const locationResponse = await fetch(reqUrl);

        if(!locationResponse.ok){

            const error = await locationResponse.json();

            return NextResponse.json({error: error.error_message});
        }

        const data = await locationResponse.json();
        
        const validAdress = data.results[0];

        return NextResponse.json(validAdress);

    }catch(error){
        console.log(error);
    }
}