'use client'

import { useState } from 'react'
import NewTrip from './NewTrip'
import ItineraryPlans from './ItineraryPlans'

const CreateNewTrip = () => {

  const [tripData, setTripData] = useState<any>();

  const fetchTripData = (newTrip: string) => {

    setTripData(newTrip)

  }

  return (
    <section className='flex flex-col pt-10 h-screen bg-black'>

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
