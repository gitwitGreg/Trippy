import { NextResponse, NextRequest} from "next/server";

/**
 * 
 * @param req -Contains city name for api call
 * @returns Weather forecast object
 */

export async function POST(req: NextRequest){

    /** Convert to json data */
    const body = await req.json();

    /** Deconstruct city name*/
    const {city} = body;

    /** Get api key */
    const key = process.env.OPEN_WEATHER_KEY

    /** Create request url */
    const reqUrl = 
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`

   try{

    /** Make a request to get weather */
    const response = await fetch(reqUrl,{
        method: 'GET'
    });

    /** If erro getting weather information throw error */
    if(!response.ok){

        const error = await response.text();

        console.log(error);

        return NextResponse.json({error: error});

    }

    /** Return new Weather object */
    const data = await response.json();

    return NextResponse.json(data);

   }catch(error){

    /** Handle errors */
    console.log(error);

    return NextResponse.json({error: error});

   }
   
}