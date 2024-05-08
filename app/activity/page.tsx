import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"  
import AddActivity from "../components/AddActivity";
import RecentActivities from "../components/RecentActivities";


export default function Activity({itineraryParams}: any){

    console.log({itineraryParams});


    return(
        <section className="flex flex-col">
            <AddActivity/>
            <RecentActivities />
        </section>
    )
}