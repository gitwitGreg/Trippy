'use client'

import { Activity } from "@prisma/client";
import { useState, useEffect } from "react"

export default function useFetchItineraryActivities(tripId: string){

    const [activities ,setActivities] = useState<Activity[] | undefined>(undefined);

    const fetchActivities = async() => {

        try{

            const response  = await fetch('/api/fetchItineraryPlans',{

                method: "POST",

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(tripId)
            });

            if(!response.ok){

                const error = await response.json();

                console.log(error.error);

            };

            const data: Activity[] = await response.json();

            setActivities(data)


        }catch(error){

            console.log(error);

        }
    }

    useEffect(() => {
        fetchActivities();
    },[tripId]);

    return {activities}
}