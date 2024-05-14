'use client'

import { Activity } from "@prisma/client";
import { useState, useEffect } from "react"

export default function useFetchRecentActivities() {

    const [activities, setActivities] = useState<Activity[] | undefined>();

    const fetchRecents = async() => {

        try{

            const response = await fetch('/api/getRecentActivity',{

                method: 'GET',

                headers: {
                    'Content-Type': 'application/json'
                },

            });

            if(!response.ok){

                const error: {error: string} = await response.json();

                console.log(error.error);

            }

            const data: Activity[] = await response.json();

            console.log('returned data: ', data);

            setActivities(data)

        }catch(error){
            
            console.log(error);

        }
    }

    useEffect(() => {
        fetchRecents();
    },[]);

    return {activities}

}