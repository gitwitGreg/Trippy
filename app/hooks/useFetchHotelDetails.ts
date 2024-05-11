import { useState } from "react";
import { useEffect } from "react";
import { PlaceDetails } from "../types";


export default function fetchHotelDetails (placeId: string | null) {

    const [hotelDetails, setHotelDetails] = useState<PlaceDetails | undefined>();

    const fetchHotelDetails = async(placeId: string | null) => {

        try{

            const response = await fetch('/api/getHotelDetails',{

                method: 'POST',

                body: JSON.stringify(placeId),

                headers: {
                    'Cotent-Type': 'application.json'
                }

            });

            if(!response.ok){

                const error = await response.json();

                console.log(error.error);

                return
                
            }

            const data = await response.json();

            setHotelDetails(data);

        }catch(error){

            console.log(error);

        }

    }

    useEffect(() => {
        fetchHotelDetails(placeId);
    },[placeId])

    return{hotelDetails}
}