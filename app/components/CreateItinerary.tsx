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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"

const CreateItinerary = ({tripId, callback}: {tripId: string, callback : (newIten: any) => void}) => {

    const [itinerary, setItinerary] = useState<string>('');
    const [actName, setActName] = useState<string>('');
    const [cost, setCost] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [errMess, setErrMess] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const handleClear = () => {
        setActName('');
        setCost('');
        setLocation('');
        setItinerary('');
    }

    const hanldeSubmit = async(e: any) => {

        e.preventDefault();

        if(!itinerary){

            console.log('missing itenarary name');

            setErrMess('missing itenarary name');

            return;
        }

        if(!tripId){
            
            console.log('missing trip id');

            setErrMess('missing trip id')

            return;
        }

        if(!Number(cost)){

            console.log('Please enter a valid number no $, 0, or letters');

            setErrMess('Please enter a valid number no $, 0, or letters');

            return;
        }

        
        const itineraryObj = {
            name: itinerary,

            activitity: {
                name: actName,
                cost: Number(cost),
                location: location
            },

            tripId : tripId

        }

        try{

            const response = await fetch('/api/makeItinerary', {
                
                method: "POST",

                headers : {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(itineraryObj)
            });

            if(!response.ok){

                console.log('error creating itinerary');

                setErrMess('Error creating itinerary');
            }

            const data = await response.json();

            setActName('');
            setCost('');
            setLocation('');
            setItinerary('');

            console.log(data, 'from api');

            setSuccess(true);

            setTimeout(() => {
                setSuccess(false)
            },3000);

            callback(data.tripId);

        }catch(error){

            console.log(error);

        }


    }

  return (

    <div className="w-full h-auto justify-center flex px-40 py-10 flex-col gap-5">

            {success && (
                <Alert className="w-full bg-orange-400 border-none">
                    <AlertTitle>Itinerary creation success</AlertTitle>
                    <AlertDescription>
                        You Itinerary has been created successfully
                    </AlertDescription>
                </Alert>
            )}

        <Card className="flex flex-col justify-center p-30 w-full bg-blue-300 text-white border-none">

        <CardHeader>
                <CardTitle>New Itinerary</CardTitle>
                <CardDescription>Add activities to your trip itinerary</CardDescription>
            </CardHeader>

            <CardContent className="flex gap-2 items-center">
                <Input
                    value={itinerary}
                    placeholder="Enter itinerary name"
                    className="bg-black w-[80%] h-12 p-3 rounded-lg text-white"
                    onChange={(e) => setItinerary(e.target.value)} 
                    required/>
            </CardContent>

            <CardHeader>
                <CardTitle>First Activity</CardTitle>
            </CardHeader>

            <CardContent className="flex gap-2 items-center">
                <Input
                    value={actName}
                    placeholder="Activity Name"
                    className="bg-black w-[80%] h-12 p-3 rounded-lg text-white"
                    onChange={(e) => setActName(e.target.value)} 
                    required/>
            </CardContent>

            <CardFooter className="flex gap-2 items-center">
                <Input
                    value={cost}
                    placeholder="Activity cost"
                    className="bg-black w-[80%] h-12 p-3 rounded-lg text-white"
                    onChange={(e) => setCost(e.target.value)} 
                    required/>
            </CardFooter>

            <CardFooter className="flex gap-2 items-center">
                <Input
                    value={location}
                    placeholder="Activity Location"
                    className="bg-black w-[80%] p-3 h-12 rounded-lg text-white"
                    onChange={(e) => setLocation(e.target.value)} 
                    required/>

            </CardFooter>

            <CardFooter className="flex gap-5 items-center justify-center">
                <Button onClick={handleClear}>Cancel</Button>
                <Button className='text-black' onClick={hanldeSubmit} variant="outline">Create</Button>
            </CardFooter>

        </Card>

    </div>

  )

}

export default CreateItinerary
