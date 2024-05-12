'use client'

import useFetchItineraryActivities from '@/app/hooks/useFetchItineraryActivities';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Button } from '@/components/ui/button';
import { Activity } from '@prisma/client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import { TailSpin } from 'react-loader-spinner';

export default function Past() {

    const search = useSearchParams();

    const id = search.get('id') as string;

    const  { activities }  : { activities : Activity[] | undefined } = useFetchItineraryActivities(id);


    if(!activities){

        return (

            <div className="h-screen w-full items-center flex justify-center bg-black">

                <TailSpin
                height="200"
                width="200"
                color="orange"
                ariaLabel="loading"
                />

            </div>
        )

    }

    return(
        <div className='bg-black text-white h-screen w-full p-20 gap-10 flex flex-col'>
            <div className='flex justify-between'>
                <h1 className='font-bold text-3xl'>
                    Activity List
                </h1>
                <Link href={{
                    pathname :'/'
                }}>

                    <Button className='bg-orange w-[100px] bg-blue-400 hover:bg-orange-400 hover:text-black ease-in'>
                        Home
                    </Button>

                </Link>
            </div>

            <hr></hr>

            {activities.map((activity) => (
                <div key={activity?.id}>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                    <AccordionTrigger className='text-xl'>{activity?.name}</AccordionTrigger>
                    <AccordionContent>
                        Cost: ${activity?.cost}
                    </AccordionContent>
                    <AccordionContent>
                        Location: {activity?.location}
                    </AccordionContent>
                    <AccordionContent>
                        Location: {activity?.location}
                    </AccordionContent>
                    </AccordionItem>
                </Accordion>
                </div>
            ))}

        </div>
    )
}