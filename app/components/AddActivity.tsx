'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"  
import { Input } from "@/components/ui/input"
import RecentActivities from "./RecentActivities"

const AddActivity = ({trip}: any) => {
    
    const [actName, setActName] = useState<string>('');
    const [cost, setCost] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [errMess, setErrMess] = useState<string>('');
    const [itinerary, setItinerary] = useState<string>('');

    const handleClear = () => {
        setActName('');
        setCost('');
        setLocation('');
        setItinerary('');
    }

    const hanldeSubmit = async(e: any) => {

        e.preventDefault()

        const validNumber = Number(cost);

        if(!validNumber){
            setErrMess('Cost entered is not a valid number');
            setTimeout(() => {
                setErrMess('')
            },3000)
        }

        const activityObj = {
            name: actName,
            cost: cost,
            location: location,
            itinerary : itinerary
        }

        try{

            const response = await fetch('/api/addActivity', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(activityObj)
            })

            if(!response.ok){

                const error = await response.text();

                console.log(error);
            }

            const data = await response.json();

            console.log(data);

        }catch(error){

            console.log(error)

        }
    }

    return(
    
    <div className="bg-black text-white h-screen w-full p-10 justify-center flex">

        <div className="flex flex-col h-full w-full items-center gap-4">

            {errMess && (
                <div className="w-full h-14 bg-red-500 rounded-xl items-center justify-center flex">
                    <p>{errMess}</p>
                </div>
            )}

            <Card className="flex flex-col justify-center p-6 w-[60%] ">

                <CardHeader>
                    <CardTitle>New Activity</CardTitle>
                    <CardDescription>Add activities to your trip itinerary</CardDescription>
                </CardHeader>

                <CardContent className="flex gap-2 items-center">
                    <Input
                        value={actName}
                        placeholder="Activity Name"
                        className="bg-black w-[80%] h-12 p-3 rounded-lg text-white"
                        onChange={(e) => setActName(e.target.value)} />
                </CardContent>

                <CardFooter className="flex gap-2 items-center">
                    <Input
                        value={cost}
                        placeholder="Activity cost"
                        className="bg-black w-[80%] h-12 p-3 rounded-lg text-white"
                        onChange={(e) => setCost(e.target.value)} />
                </CardFooter>

                <CardFooter className="flex gap-2 items-center">
                    <Input
                        value={location}
                        placeholder="Activity Location"
                        className="bg-black w-[80%] p-3 h-12 rounded-lg text-white"
                        onChange={(e) => setLocation(e.target.value)} />

                </CardFooter>

                <CardFooter className="flex gap-2 items-center">
                    <Input
                        value={itinerary}
                        placeholder="Itinerary name"
                        className="bg-black w-[80%] p-3 h-12 rounded-lg text-white"
                        onChange={(e) => setItinerary(e.target.value)} />

                </CardFooter>

                <CardFooter className="flex gap-4">
                    <Button onClick={handleClear} variant="outline">Cancel</Button>
                    <Button onClick={hanldeSubmit}>Save</Button>
                </CardFooter>

            </Card>
            
        </div>

    </div>

    )
}

export default AddActivity
