'use client'

import { Activity } from "@prisma/client"
import { useEffect, useState} from "react"


export default function useFetchActivities (newTrip: string) {

    const [activities, setActivities] = useState<Activity[] | undefined[]>();

    const fetchActivities = async() => {

        try{

            console.log('this itin id: ', newTrip);

            const response  = await fetch('/api/fetchActivities', {
                method: "POST",
                body: JSON.stringify(newTrip)
            });

            if(!response.ok){
                console.log('No activities');
                setActivities(undefined);
            }

            const data = await response.json();

            console.log(data);

            setActivities(data);

        }catch(error){

            console.log(error);

        }
    }

    useEffect(() => {
        fetchActivities();
    },[])

    return{activities}

}