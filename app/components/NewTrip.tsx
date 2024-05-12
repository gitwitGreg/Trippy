'use client'

import React from 'react'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { parseDate } from "@/app/helpers";
import Link from 'next/link';
import { motion } from "framer-motion"
import CreateItinerary from './CreateItinerary';
import { Trips } from '@prisma/client';
import { Button } from '@/components/ui/button';

const NewTrip = ({callback} : {callback : (newTrip: any) => void}) => {

    const [location, setLocation] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [members, setMembers] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [beginingDate, setBeginingDate] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [errMess, setErrMess]= useState<string>('');
    const [trip, setTrip] = useState<Trips>();

    const handleSubmit = async(e: any) => {

        e.preventDefault();

        const parsedBegining = parseDate(beginingDate);

        const parsedEnd = parseDate(endDate);

        if(parsedEnd < parsedBegining){

            setErrMess('The end date cannot be before the start date');

            setTimeout(() => {
                setErrMess("");
            },3000)

            return;
        }

        console.log(parsedBegining);

        if(parsedBegining === 0  || parsedEnd === 0){

            setErrMess('Please enter a valid date');

            setTimeout(() => {
                setErrMess("");
            },3000)

            return

        }


        const memberList = members.split(',');

        const tripObj = {
            title: title,
            location: location,
            members: memberList,
            beginingDate: beginingDate,
            endDate: endDate
        }

        try{
            const response = await fetch('/api/createTrip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tripObj)
            })

            console.log('outside')

            const data = await response.json();

            if(data.error){

                setErrMess(data.error);

                setTimeout(() => {
                    setErrMess('');
                    
                }, 3000)
                
                return;
            }

            console.log(data);
            
            setTrip(data);


            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
                
            }, 3000)

        }catch(error){
            console.log(error);
        }
    }

    if(trip){
        console.log('this is out trip after we create a new trip: ', trip);
    }

  return (
    <motion.div animate={{
        rotate: [360,180,90,0],
    }}
    transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: 0,
        repeatDelay: 1
      }}
      className='w-auto h-auto bg-black flex flex-col gap-4'>
        <div className='h-auto w-full'>

            {errMess && (
                <Alert className='bg-red-500 border-none'>
                    <AlertTitle>Trip creation Failure</AlertTitle>
                    <AlertDescription>
                        {errMess}
                    </AlertDescription>
                </Alert>
            )}

            {success && (
                <Alert className='bg-green-500 border-none'>
                    <AlertTitle>Trip creation success</AlertTitle>
                    <AlertDescription>
                        You Trip has been created successfully
                    </AlertDescription>
            </Alert>
            )}

            <form className='gap-4 flex flex-col border border-orange-400 rounded-xl h-auto w-full p-8' onSubmit={handleSubmit}>

                <h1 className='ml-[45%] text-4xl font-serif font-bold'>New Trip</h1>

                <label>Where would you lke to go? (city state country)</label>
                <input className='tripInputs' placeholder='Las Vegas Nevada' value={location} onChange={(e) => setLocation(e.target.value)}></input>

                <label>What is the title of this trip?</label>
                <input className='tripInputs' placeholder='Vegas baby!' value={title} onChange={(e) => setTitle(e.target.value)}></input>

                <label>Who else will be joining you?</label>
                <input className='tripInputs' placeholder='separate by comma' value={members} onChange={(e) => setMembers(e.target.value)}></input>

                <label>When does the trip start?</label>
                <input className='tripInputs'  value={beginingDate} onChange={(e) => setBeginingDate(e.target.value)} placeholder='May 20 2024'></input>

                <label>When does the trip end? (month day year)</label>
                <input className='tripInputs' placeholder='june 20 2024' value={endDate} onChange={(e) => setEndDate(e.target.value)}></input>

                <button className=' bg-orange-400 w-full rounded-lg hover:bg-black ease-out h-10 hover:text-blue-300'>Create Trip</button>

                {trip && (
                    <Link href={{
                        pathname: '/home',
                        query: trip
                    }}>
                        <button className=' bg-orange-400 w-full rounded-lg hover:bg-black ease-out h-10 hover:text-blue-300'>Strart Planning</button>
                    </Link>
                )}
                
            </form>

        </div>

        <Link 
        className='mb-10'
        href={{
        pathname :'/'
        }}>
            <Button className='bg-orange w-full bg-blue-400 hover:bg-orange-400 hover:text-black ease-in'>
            New location
            </Button>
        </Link>

        {trip && (
            <CreateItinerary
            tripId={trip?.id}
            callback={callback}/>
        )}

    </motion.div>
  )
}

export default NewTrip
