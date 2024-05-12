import { NextRequest, NextResponse } from "next/server";

/**
 * 
 * @param req - Array of photo reffrences
 * @returns - Array of images
 */

export async function POST (req: NextRequest){

    /** Convert request to json */
    const body: string[] = await req.json();

    /** Get api key */
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_PUBLISHABLE_KEY;

    /** Construct url */
    const uri = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400`;

    /** Create empty array for photos */
    let photoArray: any[] = [];

    try{

        for(const imgRef of body){

            try{

                /** Make request for each image */
                const response = await fetch(`${uri}&photo_reference=${imgRef}&key=${key}`)

                /** If error getting images throw an error */
                if(!response.ok){
    
                    const error = await response.json();
    
                    return NextResponse.json({error: error});
    
                }
    
                const img = response.url;

                /** Push image to array */
                photoArray.push(img)
    

            }catch(error){

                /** Catch any errors */

                return NextResponse.json({error: error});
            }

        }

        /** Return array of images */
        return NextResponse.json(photoArray);

    }catch(error){

        /** Handle any error's */

        return NextResponse.json({error: error});
    }
}