'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import fetchHotelDetails from "../hooks/useFetchHotelDetails";
import { PlaceDetails } from "../types";
import StarIcon from '@mui/icons-material/Star';
import { TailSpin} from 'react-loader-spinner'
import Link from "next/link"
import { convertTimestampToTime } from "../helpers/convertTimestamp";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import { Card, CardContent } from "@/components/ui/card"

export default function HotelInfo() {

    const [errMess, setErrMess] = useState<string>();

    const [imageUrls, setImageUrls] = useState([]);

    const search = useSearchParams();

    const placeId: string | null = search.get('place_id');

    const { hotelDetails }: {
        hotelDetails: PlaceDetails | undefined
    } = fetchHotelDetails(placeId);

    useEffect(() => {

        const fetchImageUrls = async () => {

            if(!hotelDetails){
                return;
            }


            let photoRefs: string[] = [] ;

            hotelDetails.photos.forEach((photo) => {

                photoRefs.push(photo.photo_reference);

            })

            try{

                console.log('starting api calls')

                const response = await fetch('/api/fetchHotelImages', {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        photos: photoRefs
                    })

                })

                if(!response.ok){

                    const error = await response.json();

                    console.log(error.error);

                }

                const pictureArray = await response.json();

                console.log(pictureArray[0]);

                setImageUrls(pictureArray);

            }catch(error){
                console.log(error);
            }
        };

        fetchImageUrls();
    }, [hotelDetails]);

    if(!hotelDetails){
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

    return(
        <div className="bg-black text-white h-full w-full p-10">

            <div className="h-auto w-full flex flex-col gap-5">

                <h1 className="text-3xl font-bold font-serif"> Details</h1>
                
                <hr></hr>

                <Link href={hotelDetails?.url as string} className="gap-5 flex flex-col">

                    <div className="flex flex-col bg-orange-400 p-10 gap-5 rounded-xl h-auto">

                        <h1 className="text-2xl font-bold text-black">{hotelDetails?.name}</h1>

                        <span>{hotelDetails?.editorial_summary.overview}</span>

                    </div>

                </Link>

                <div className="w-full h-auto">

                    {imageUrls && (
                        <div className="items-center justify-center flex bg-transparent w-full">
                            <Carousel
                            opts={{
                            align: "start",
                            }}
                            className="w-full max-w-sm"
                            >

                                <CarouselContent className="w-full h-full">
                                    {imageUrls.map((image:string, index:number) => (
                                        <CarouselItem key={index} className=" bg-black h-auto">
                                            <div className="p-1">
                                                <Card className="bg-transparent border-none w-full h-full">
                                                    <CardContent className="flex aspect-square items-center justify-center p-6 h-auto w-full">
                                                        <img src={image} height={700} className="h-[600]"/>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>

                                <CarouselPrevious />

                                <CarouselNext />

                            </Carousel>
                        </div>
                    )}

                </div>
                
                <div className="flex flex-col p-20 gap-10 h-auto mt-[-50px]">

                   {hotelDetails.reviews.map((review, index) => (

                        <div key={review.author_name} className={index % 2 == 0 ? 'bg-orange-400 flex flex-col p-10 rounded-xl h-auto w-full gap-5 text-black': 'bg-blue-400 flex flex-col p-10 rounded-xl h-auto w-full gap-5'}>

                            <div className="flex gap-4 items-center">

                                <img src={review.profile_photo_url} height={30} width={60}/>

                                <div className="flex flex-col">

                                    <h1 className="text-lg">{review.author_name}</h1>

                                    <p>{review.language}</p>
                                    
                                </div>

                            </div>

                            <div className="flex h-auto w-auto gap-5 items-center">

                                <p>{review.rating} <StarIcon className="text-yellow-400"/></p>

                                <p>{convertTimestampToTime(review.time)}</p>

                                <p>{review.relative_time_description}</p>

                            </div>

                            <p className="text-lg font-serif">{review.text}</p>

                        </div>
                   ))}
                </div>

                <div className="flex gap-5 bg-blue-400 p-10 rounded-xl items-center justify-center text-lg h-auto">

                    <p>User rating total : {hotelDetails.user_ratings_total}</p>

                    <hr className="text-black"></hr>

                    <p>{hotelDetails?.rating}<StarIcon className="text-yellow-400"/></p>

                    <hr></hr>

                    <p>{hotelDetails?.reviews.length} reviews</p>

                </div>

            </div>

        </div>
    )
}