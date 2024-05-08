import React from 'react'
import { motion } from "framer-motion"
import { Trip } from '../types'
import Link from 'next/link'


const PastTrips = ({trips}: {trips: Trip[] | null}) => {

    if(!trips){
        return (
            <div className='bg-blue-300 p-20 rounded-lg flex items-center justify-center'>
                <p className='text-xl'>
                    No trips yet! As you start to complete your trips they will begin to apear here
                    <img src=''/>
                </p>
            </div>
        )
    }

  return (
    <div className='h-full w-full flex flex-col gap-8 items-center justify-center'>
        <div className='itsm-center justify-center flex'>
        <h1 className='text-4xl font-bold font-serif'>Past Trips</h1>
        </div>
      {trips.map((trip: any, index: number) => (
        <motion.div whileHover={{ scale: [0.8, 1.1, 1] }} className='w-full'
        transition={{ duration: 0.3 }}>
            <div key={index} className={index % 2 == 0 ? 'flex flex-col w-full bg-blue-300 p-4 rounded-lg gap-2 cursor-pointer' : 'flex flex-col w-full bg-orange-400 p-4 rounded-lg gap-2 text-black cursor-pointer'}>
                <Link href={{
                    pathname: '/trips/past',
                    query: trip
                }}>
                <h1 className='text-2xl font-serif font-bold'>{trip.title}</h1>
                <h1 className='font-semibold'>{trip.location}</h1>
                <div className='flex items-end justify-center flex-col font-bold'>
                    <p>{trip.beginingDate}</p>
                    <p>{trip.endDate}</p>
                </div>
                {!trip.members.includes('alone') && (
                    trip.members.map((member: string) => (
                        <ul>
                            <li className='font-semibold'>{member}</li>
                        </ul>
                    ))
                )}
                </Link>
            </div>
        </motion.div>

      ))}
    </div>
  )
}

export default PastTrips
