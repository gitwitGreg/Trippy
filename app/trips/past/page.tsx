'use client'

import { useSearchParams } from 'next/navigation'

export default function Past({tripParams}: any) {

    const search = useSearchParams();

    const id = search.get('id');

    

    return(
        <div className='bg-black text-white h-screen w-full p-20 border-orange-400 border'>
            Past
        </div>
    )
}