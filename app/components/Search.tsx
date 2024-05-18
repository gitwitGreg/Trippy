'use client'

import { useState, useEffect } from "react"
import Link from "next/link";
import useFetchTrips from "../hooks/useFetchTrips";
import { Button } from "@/components/ui/button";

const Search = () => {

    const [adress, setAdress] = useState<string>('');

    const [validAdress, setValidAddress] = useState<any>('');

    const [errMess, setErrmess] = useState<string>('');

    const {trips}: any = useFetchTrips();

    const handleClick = async(e: any) => {
        
        e.preventDefault();

        if(!adress){

            setErrmess('missing adress');

            return;

        }

        try{

            const response = await fetch('/api/getLocation',{
                method: 'POST',
                body: JSON.stringify(adress),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(!response.ok){

                console.log('bad response');

                const error: {error: string} = await response.json();

                setErrmess(error.error);

                return;
            }

            const data = await response.json();

            const addressComp = data.address_components;

            const cityComponent = addressComp.find((component: { 
                long_name : string,
                short_name: string,
                types: string[]
                | string[]; 
            }) =>
                component.types.includes("locality")
            );

            if(!cityComponent){

                console.log('missing city');

                return;

            }

            const paramsObj = {
                adresss: data.formatted_address,
                lat: data.geometry.location.lat,
                lon: data.geometry.location.lng,
                city: cityComponent.long_name,
            }

            setValidAddress(paramsObj);
            
        }catch(error){
            
            console.log(error);

        }
    }

  return (
    <div className="flex h-screen w-full items-center justify-center p-40 gap-20 overflow-hidden">

        <div className="flex items-center flex-col h-full w-full bg-sky-400 rounded-3xl">

            <div className=" h-auto w-full flex flex-wrap overflow-x-hidden p-10 justify-center items-center gap-4">

                <h1 className=" text-6xl font-bold font-sans">
                    Trippy
                </h1>
                
                <form 
                className="gap-6 flex flex-col w-full mt-10">

                    <input 
                    placeholder="where would you like to go"
                    value={adress}
                    className="w-full border border-black rounded p-4 bg-black text-white"
                    onChange={(e) => setAdress(e.target.value)}
                    />

                    {adress && (
                        <button 
                        onClick={handleClick}
                        className="border-black p-4 w-full rounded-xl border-2 bg-orange-500 hover:bg-sky-400 ease-out hover:border-none delay-75">
                            Verify adress
                        </button>
                    )}

                </form>

                {validAdress && (
                    <div className="h-full w-full">
                        <Link 
                        href={{
                            pathname: '/home',
                            query: validAdress
                        }}>
                            <button className="border-black p-4 w-full rounded-xl border-2 bg-orange-500 hover:bg-sky-400 ease-out hover:border-none delay-75">
                                Start planning
                            </button>
                        </Link>
                    </div>
                )}

                {trips && (
                    <div>
                        <Link href='/trips'>
                            <Button className='bg-black text-white font-bold hover:bg-sky-400 easein'> View all planned trips</Button>
                        </Link>
                    </div>
                )}

            </div>
        </div>
        
        <div className="flex flex-col items-center justify-center bg-orange-500 rounded-xl w-auto h-[70%] p-12 overflow-y-scroll">
            <h1 className="text-2xl font-semibold mt-10">What can we do?</h1>
            <ul className="w-full h-full ml-[10%] mt-8 flex flex-col gap-3">
                <li>Start you journey</li>
                <li>Organize all your travel plans</li>
                <li>Book hotels</li>
                <li>See activities in the area</li>
                <li>Get directions</li>
            </ul>
        </div>
      
    </div>
  )
}

export default Search
