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
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function Activity({tripParams}: {tripParams: string}){

    if(!tripParams){

        return(
            <RecentActivities />
        )
        
    }


    return(

        <section className="flex flex-col gap-0">

            <AddActivity tripId={tripParams}/>

            <div className="bg-black h-auto w-full">
                <Link href='/'>
                    <Button className="w-full h-auto bg-orange-400 text-black hover:bg-blue-400 hover:text-white ease-in">Home</Button>
                </Link>
            </div>

            <RecentActivities />

        </section>

    )
}