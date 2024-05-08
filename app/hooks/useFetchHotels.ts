'use client'

import { useState } from "react"
import { useEffect } from "react"
import { useContext } from 'react';


export default function useFetchHotels (location: string) {

    const [hotels, setHotels] = useState(null);


    const fetHotels = async() => {

        try{

            const response = await fetch('/api/getHotel', {
                method: 'POST',
                body: JSON.stringify(location)
            })

            if(!response.ok){
                const error =  await response.text();
                console.log(error);
                return;
            }

            const data = await response.json();

            setHotels(data);

        }catch(error){

            console.log(error);

            return;
        }
    }

    useEffect(() => {
        fetHotels();
    },[location]);

    return{hotels}

}