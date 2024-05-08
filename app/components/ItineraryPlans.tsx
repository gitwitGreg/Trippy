import React from 'react'
import useFetchActivities from '../hooks/useFetchActivities'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"



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
    <div className='bg-black text-white w-full h-screen'>
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
