import { NextRequest, NextResponse } from "next/server";

/**
 * 
 * @param req - object with photos property containing an array of string photo references
 * @returns - Array of images
 */
export async function POST(req: NextRequest) {
    
    try {
        /** Convert request to json object */
        const body = await req.json();

        /** Deconstruct photos from request */
        const { photos } = body;

        if (!photos || !Array.isArray(photos) || photos.length === 0) {
            return NextResponse.json({ error: "Invalid request: 'photos' property is missing or empty." });
        }

        /** Get api key */
        const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_PUBLISHABLE_KEY;

        /** Function to fetch photos */
        const fetchPhotos = async () => {

            const responses = await Promise.all(photos.map(async (photo: string) => {

                /** Construct uri */
                const uri = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&maxheight=1000&photo_reference=${photo}&key=${key}`;
                
                try {

                    /** Make api call */
                    const response = await fetch(uri);

                    if (!response.ok) {

                        const error = await response.json();

                        console.error(error);

                        return { error };
                    }

                    return response.url;

                } catch (error) {

                    /** Handle errors */
                    console.error(error);

                    return { error };

                }

            }));

            return responses;
        };

        /** Call function */
        const data = await fetchPhotos();

        return NextResponse.json(data);

    } catch (error) {

        /** Handle unexpected errors */
        console.error(error);

        return NextResponse.json({ error: "Internal server error." });
    }
}
