'use client'

import CreateItinerary from "../components/CreateItinerary"
import { useSearchParams } from "next/navigation";
import CreateNewTrip from "../components/CreateNewTrip";

export default function Itinerary({location}: any) {
    
    return (
        <div className="bg-black text-white h-screen">
                <CreateNewTrip /> 
        </div>
    )
}