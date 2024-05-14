import React from 'react'
import useFetchActivities from '../hooks/useFetchActivities'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link';
import { Button } from '@/components/ui/button';



const ItineraryPlans = ({newTrip} : {newTrip: string}) => {
     
    const { activities } = useFetchActivities(newTrip);

    if(!activities){
      return(
        <div className='bg-black text-white p-20 w-full h-auto'>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className='text-xl'>No activities yet</AccordionTrigger>
              <AccordionContent>
                How do you not have plans 🤔 ???
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )
    }

  return (
    <div className='bg-black text-white w-full h-screen p-4 gap-4'>
      <Link href={{
        pathname: '/activity',
        query: newTrip
      }}>
        <Button className='w-full bg-orange-400 text-black hover:bg-blue-400 hover:text-white'>Add more activities</Button>
      </Link>

      <h1 className='text-3xl font-bold font-serif'>Itinerary plans</h1>

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
            </AccordionItem>
          </Accordion>
        </div>
      ))}

    </div>
  )
}

export default ItineraryPlans
