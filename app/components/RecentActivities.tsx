'use client'
import React from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  } from "@/components/ui/accordion"
import useFetchRecentActivities from '../hooks/useFetchRecentActivities';
import { Activity } from '@prisma/client';
import { TailSpin } from 'react-loader-spinner';
  

const RecentActivities = () => {
    
  const { activities } : {activities: Activity[] | undefined} = useFetchRecentActivities();

  console.log(activities);


  if(!activities){
    return(
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

  return (
    <div className='text-white bg-black p-10 flex flex-col  h-screen w-auto gap-10'>
      <div className='flex flex-col'>
        <h1 className='font-bold text-xl'>Recent activity</h1>
        <hr></hr>
      </div>

      <div className='w-full h-auto'>
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
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>

    </div>
  )
}

export default RecentActivities
