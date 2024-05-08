'use client'

import React, { FormEvent, useEffect, useMemo, useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import useFetchHotels from '../hooks/useFetchHotels'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { shortenString } from '../helpers/shortenString';



const Hotels = ({location}: {location: string}) => {

  const [imgRef, setImgRef] = useState();

  const [imageUrl, setImageUrl] = useState(null);

  const { hotels }: any = useFetchHotels(location);

  const fetchImages = async() => {

    if(!hotels){

      console.log('No hotels found');

      return;

    }

    let imgArr: any[] = []

    hotels.forEach((hotel: any) => {

      imgArr.push(hotel.photos[0].photo_reference);
      
    })

    try{

      console.log(imgArr)

      const response = await fetch('/api/fetchImages', {
        method: "POST",

        headers: {
          'Content-type': 'application/json'
        },

        body : JSON.stringify(imgArr)
      })

      if(!response.ok){

        console.log('error while retreiving photos');

        return;
      }

      const data = await response.json();

      console.log(data);

      setImgRef(data)

    }catch(error){

      console.log(error);

    }
  }

  useEffect(() => {
    fetchImages();
  },[hotels])

  if(hotels){
    console.log(hotels[0]);
  }
  

  if(!hotels){

    return (

      <div className='w-full h-screen p-10 gap-12 flex flex-col'>

        <div className='w-full h-auto bg-red-400 p-10 rounded-xl itemd-center flex justify-center'>

          <h1 className='text-lg font-bold'>Unnable to find hotels in the area. Try somwhere else</h1>

        </div>
        
      </div>
    )

  }


  if(!imgRef){
    return(
      <div className='bg-black h-screen'>
        Loading....
      </div>
    )
  }

  return (
    <div className='h-full p-10 gap-5 flex flex-col w-full text-black'>

      {imgRef && (
        <div className='gap-5 flex flex-col h-full w-full'>

          {hotels.map((hotel: any, index: number) => (
            
            <motion.div
            transition={{ duration: 0.3 }}
            whileHover={{ scale: [0.8, 1.1, 1] }} 
            className={index % 2 == 0? 'bg-gray-200 w-full h-full p-0 flex gap-0 rounded-xl' : `bg-blue-300 w-full p-0 flex gap-0 rounded-xl`}>

              <div className='w-[50%] h-auto'>

                  <img src={imgRef[index]} height={500} width={500} alt='hotel-picture' className='rounded-lg'/>

              </div>

              <div className='w-[40%] flex flex-col p-10 gap-10 h-40  md:h-full'>

                <h1 className='font-bold text-xl'>{shortenString(hotel.name)}</h1>

                <p className='font-semibold'>{hotel.formatted_address}</p>

                <div className='flex flex-col'>
                  <Link href={{
                    pathname: '/hotelInfo',
                    query: {
                      place_id: hotel.place_id
                    }
                  }}>
                    <Button className='bg-red-500'>
                      Learn More!
                    </Button>
                  </Link>
                </div>

              </div>

              <div className='p-10'>

                <span className='flex'>{hotel.rating}/5<p className='text-sm text-yellow-300'><StarIcon /></p></span>

              </div>

            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Hotels
