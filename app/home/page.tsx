import { useSearchParams } from "react-router-dom"
import { useRouter } from "next/navigation"
import WeatherForecast from "../components/Weather"
import CreateNewTrip from "../components/CreateNewTrip"
import BottomBar from "../components/BottomBar"
import AddActivity from "../components/AddActivity"
import Hotels from "../components/Hotels"


interface SearchParamProps {
    adresss: string,
    lat: number,
    lon: number,
    city: string,
}



export default function HomePage({searchParams}: {searchParams: SearchParamProps}){

    return(
        <div className="bg-black text-white h-full w-full pt-1 gap-10 flex flex-col">

            <WeatherForecast 
            lat={searchParams.lat}
            city= {searchParams.city}
            />

            <Hotels 
            location={searchParams.adresss}/> 

        </div>
    )
}