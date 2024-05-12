'use client'

import { useState } from "react"
import useFetchTrips from "../hooks/useFetchTrips"
import NewTrip from "./NewTrip"
import PastTrips from "./PastTrips"
import { Trips } from "@prisma/client"

export const TripList = () => {

    const [newTrip,setNewTrip] = useState<Trips | undefined>();

    const {trips}: any = useFetchTrips();

    const getNewTrip = (trip: Trips) => {
        setNewTrip(trip);
    }
    

    return(
        <div className="flex flex-col gap-16 h-full w-full">

            <NewTrip callback={getNewTrip}/>

            <PastTrips
            trips={trips} />

        </div>
    )
}