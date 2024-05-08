
import React from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import useFetchRecentActivities from '../hooks/useFetchActivities';
import { Activity } from '@prisma/client';
  

const RecentActivities = () => {
    
    const { activities } : any = useFetchRecentActivities();

  return (
    <div className='text-white bg-black p-10 items-center flex justify-center'>
      Recent activities
    </div>
  )
}

export default RecentActivities
