'use client'
import React, { useEffect, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader';
import { LocationObject } from '../types';


const GoogleMaps = () => {

    const mapRef = React.useRef(null);

    const [userLocation, setUserLocation] = useState<LocationObject | null>(null);

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

    useEffect(() => {
        getCurrentPosition(); 
    }, []);

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

    if(!userLocation){
        return (
            <div>
                Loading...
            </div>
        )
    }

  return (
    <div className='h-screen' ref={mapRef}>  
        Map
    </div>
  )
}

export default GoogleMaps
