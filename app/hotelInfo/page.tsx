'use client'

import { headers } from "next/headers";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function HotelInfo() {

    const [errorMess, setErrMess] = useState<string>();

    const search = useSearchParams();

    const placeId = search.get('place_id');

    return(
        <div className="bg-black text-white h-screen w-full p-10">
            Hey
        </div>
    )
}