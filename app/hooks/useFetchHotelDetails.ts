import { useState } from "react";
import { useEffect } from "react";


export default function fetchHotelDetails (placeId: string) {

    const [hoteDetails, setHotelDetails] = useState();

    const fetchHotelDetails = async(placeId: string) => {

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

            console.log(data);

            setHotelDetails(data);

        }catch(error){

            console.log(error);

        }

    }

    useEffect(() => {
        fetchHotelDetails(placeId);
    },[placeId])

    return{hoteDetails}
}