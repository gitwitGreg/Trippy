import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest){

    const body: any[] = await req.json();

    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_PUBLISHABLE_KEY;

    const uri = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400`;

    let photoArray: any[] = [];

    try{


        for(const imgRef of body){

            try{

                const response = await fetch(`${uri}&photo_reference=${imgRef}&key=${key}`)

                if(!response.ok){
    
                    const error = await response.json();
    
                    console.log(error);
    
                    return NextResponse.json({error: error});
    
                }
    
                const img = response.url;

                photoArray.push(img)
    

            }catch(error){

                console.log(error)

                return NextResponse.json({error: error});
            }

        }

        return NextResponse.json(photoArray);

    }catch(error){

        /** Handle any error's */
        console.log(error);

        return NextResponse.json({error: error});
    }
}