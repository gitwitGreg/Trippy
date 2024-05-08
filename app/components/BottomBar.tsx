import React from 'react'
import MapIcon from '@mui/icons-material/Map';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

const BottomBar = () => {
  return (
    <div className='w-auto h-auto text-black bg-orange-500'>

      <div className='flex justify-between items-center w-full h-auto'>

        <Link href='/map'>
          <MapIcon style={{height: 100, width:100 }} 
          className='hover:text-blue-400'/>
        </Link>


        <Link href='/itinerary'>
          <AddIcon  style={{height: 100, width:100}} 
          className='hover:text-blue-400'/>
        </Link>


        <Link href = '/calendar'>
          <CalendarMonthIcon  style={{height: 100, width:100}} 
          className='hover:text-blue-400'/>
        </Link>

      </div>
  
    </div>
  )
}

export default BottomBar
