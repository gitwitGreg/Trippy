'use client'

import { useState } from 'react'
import NewTrip from './NewTrip'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ItineraryPlans from './ItineraryPlans'

const CreateNewTrip = () => {

  const [tripData, setTripData] = useState<any>();

  const fetchTripData = (newTrip: string) => {
    setTripData(newTrip)
  }
  


  return (
    <section className='gap-5 flex flex-col pt-10 h-screen'>

      <NewTrip 
        callback={fetchTripData}
      />

      {tripData && (
        <ItineraryPlans 
        newTrip={tripData}/>
      )}

    </section>
  )
}

export default CreateNewTrip
