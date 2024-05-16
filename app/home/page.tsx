import WeatherForecast from "../components/Weather"
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