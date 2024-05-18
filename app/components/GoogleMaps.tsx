'use client'
import React, { useEffect, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader';
import { LocationObject } from '../types';
import { TailSpin } from 'react-loader-spinner';
import { useSearchParams } from 'next/navigation';


const GoogleMaps = () => {

    const search = useSearchParams();

    const tripId =  search.get('tripId');

    const mapRef = React.useRef(null);

    const newMapRef = React.useRef(null);

    const [userLocation, setUserLocation] = useState<LocationObject | null>(null);

    const [coordinates, setCoordinates] = useState<{lat:number, lng: number}>();

    const [errMess, setErrMess] = useState<string>();

    const getCurrentPosition = () => {
        
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(

                (position) => {

                    const { latitude, longitude } =  position.coords;

                    const locationObj = {
                        latitude: latitude,
                        longitude: longitude
                    }

                    setUserLocation(locationObj);
                },
                error => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const fetchTripCoordinates = async(tripId: string) => {

        try{

            const response = await fetch('/api/fetchTripCoordinates',{

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },
                
                body: JSON.stringify(tripId)
            })

            if(!response.ok){

                const error = await response.json();
                
                console.log(error.error);

                setErrMess(error.error);
            }

            const data = await response.json();

            console.log(data);

            setCoordinates(data);

            console.log('success');

        }catch(error){

            console.log(error);

        }
    }

    useEffect( () => {
        if(!tripId){
            getCurrentPosition(); 
        }

        if(tripId){
            fetchTripCoordinates(tripId);
        }
    }, [tripId]);

    useEffect(() => {
        
        const initializeMap = async() => {

            if(!userLocation){
                console.log('no location');
                return;
            }

            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_PUBLISHABLE_KEY   as string,
                version: `quaterly`
            });

            const { Map } = await loader.importLibrary('maps');
            const { Marker } = await loader.importLibrary('marker');


            const locationInMap = {
                lat: userLocation?.latitude,
                lng: userLocation?.longitude
            }

            const options = {
                center: locationInMap,
                zoom: 15,
                mapId: 'current location'
            }

            const map = new Map(mapRef.current, options,)

            const marker = new Marker({
                map: map,
                position: locationInMap
            })
            
        }
        initializeMap();
    },[userLocation])



    useEffect(() => {
        const initializeMapWithTrip = async() => {

            if(!coordinates){
    
                console.log('no coordinates');
                
                return;
            }

    
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_PUBLISHABLE_KEY   as string,
                version: `quaterly`
            });
    
            const { Map } = await loader.importLibrary('maps');
            const { Marker } = await loader.importLibrary('marker');
    
    
            const locationInMap = {
                lat: coordinates.lat,
                lng: coordinates.lng
            }
    

            const options = {
                center: coordinates,
                zoom: 15,
                mapId: 'current location'
            }
    
            const map = new Map(newMapRef.current, options,)
    
            const marker = new Marker({
                map: map,
                position: locationInMap
            })

            console.log('done');
        }
        initializeMapWithTrip();
    },[coordinates])

    if(!userLocation && !coordinates){
        return (
            <div className="h-screen w-full items-center flex justify-center bg-black">
                <TailSpin
                height="200"
                width="200"
                color="orange"
                ariaLabel="loading"
                />
            </div>
        )
    }

    if(!userLocation && coordinates){
        return(
            <div className='h-screen' ref={newMapRef}></div>
        )
    }

  return (
    <div className='h-auto' ref={mapRef}>  </div>
  )
}

export default GoogleMaps
