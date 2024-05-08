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
            const error = await response.text();
            console.log(error);
            setTrips(null);
          }

          const data = await response.json();
          setTrips(data);
    
        }catch(error){
          console.log(error)
        }
    }

    useEffect(() => {
        fetchTrips()
    },[]);

    return {trips}
}