'use client'

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"

interface LocationProp {
    lat: number,
    city: string
}


export default function WeatherForecast({lat, city}: LocationProp){

    const [forecast, setForecast] = useState<any>(null);

    const [progress, setProgress] = useState<number>(13);

    const fetchForeCast = async() => {

        try{
            const response = await fetch('/api/getForecast', {
                method: 'POST',
                body: JSON.stringify({city: city}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(!response.ok){
                console.log('error getting forecast');
                return;
            }

            const data = await response.json();

            setForecast(data);
            
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchForeCast();
    },[lat]);

    if(!forecast){
        return(
            <div>
                <Progress value={progress} className="w-[60%]" />
            </div>
        )
    }

    return(
        <div className="h-auto p-20 flex justify-between bg-blue-300 rounded-xl m-4">

            <div>
                <h1 className="text-3xl font-bold font-serif">
                    {forecast.name}
                </h1>
            </div>

            <div className="flex flex-col">

                <div className="flex gap-4 items-center justify-center ">
                    <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}/>
                    <p className="font-semibold text-lg">{forecast.main.temp}</p>
                </div>

                <div>
                    <p className="font-semibold text-lg">
                        {forecast.weather[0].description}
                    </p>
                </div>

            </div>
        </div>
    )
}