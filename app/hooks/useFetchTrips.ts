'use client'

import { useState, useEffect } from "react"
import { Trip } from "../types";


export default function useFetchTrips () {

    const [trips , setTrips] = useState<Trip | null>(null);
    
    const fetchTrips = async() => {

        try{

          const response = await fetch('/api/getTrips', {
            method: 'GET'
          })
    
          if(!response.ok){

            const error: {error: string} = await response.json();

            console.log('this is our server returned error : ', error);

            setTrips(null);

            return;
          }

          
          const data = await response.json();
          console.log(data)

          setTrips(data);
    
        }catch(error){

          console.log(error);

        }
    }

    useEffect(() => {
        fetchTrips()
    },[]);

    return {trips}
}