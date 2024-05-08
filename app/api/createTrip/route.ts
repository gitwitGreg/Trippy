import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import { connectToDb } from "@/app/mongo";
import { currentUser } from "@clerk/nextjs";


/**
 * 
 * @param req request contains location, starting date, end date date and title of the itinerary
 * @returns the new trip object
 */


export async function POST (req: NextRequest) {

    /** Convert to json  */
    const body = await req.json();

    /** Deconstruct nessesary variables */
    const {title ,location, members, beginingDate, endDate} = body;

    /** Get list of all users in out clerk system */
    const usersList = await clerkClient.users.getUserList();

    /** Create new prisa instance */
    const prisma = new PrismaClient;

    /** Create a new array to store valid memberId */
    let memberIds: string[] = [];

    /** Create an array to hold non founf members */
    let rejectList: string[] = [];

    /** Create a variable to hold The accurate adress fromo what the user entered */
    let validatedLocation;

    /** Create an object which we can hold the lat, lng and city information */
    let newTripLocationObj;

    try{
        
        /** Connect to the database */
        await connectToDb();

        /** If the list is empty push the string alone */
        if(members[0] == ''){

            memberIds.push('alone');

        }else{

            /** get the email adress of all valid members */
            members.forEach((searchMember: string) => {
                
                const foundMember = usersList.find(

                    (member) => searchMember === member.emailAddresses[0].emailAddress

                );

                if (foundMember) {

                    memberIds.push(searchMember);

                } else {

                    rejectList.push(searchMember);

                }

            });

        }

        /** If members in reject list return json object of which names rejected*/
        if(rejectList.length != 0){
            console.log(rejectList);
            console.log('reject error')
            return NextResponse.json({
                error: 'Error adding one or more users added to the trip',
                status: 401,
                members: rejectList
            })
        }

        try{
            
            /** Get google api key */
            const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_PUBLISHABLE_KEY 

            /** Create request url */
            const reqUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`

            /** Make request to url */
            const locationResponse = await fetch(reqUrl);

            /** Hanlde case where location is not found */
            const locationData = await locationResponse.json();

            if(locationData.results.length === 0 ){

                return NextResponse.json({error: 'Location is invalid'});

            }

            /** Get the lat, lng, city from return object */

            validatedLocation = locationData.results[0].formatted_address;

            newTripLocationObj = {
                adress: validatedLocation,
                lat: locationData.results[0].geometry.location.lat,
                lon: locationData.results[0].geometry.location.lat,
                city: locationData.results[0].address_components[0].long_name
            }

        }catch(error){

            /** Handle errors */
            console.log(error);

            return NextResponse.json({error: 'Location not valid'});

        }

        /** Get the current user */
        const currUser = await currentUser();

        if(!currUser){
            
            /** return error if no currrent user */
            console.log('error finding user');

            return NextResponse.json({error: 'error finding user before making record'});

        }

        /** Ensure location has valuec */
        if(!validatedLocation){

            return NextResponse.json({error: 'Error finding location'});

        }

        /** Create new trip in prisma */
       const newTrip =  await prisma.trips.create({
            data : {
                title: title,
                location: validatedLocation,
                members: memberIds,
                beginingDate: beginingDate,
                endDate: endDate,
                owner: currUser.id
            }
        })

        /** Return error object if error creating  */
        if(!newTrip){

            console.log('error making new trip');
            
            return NextResponse.json({
                error: 'Error creating new trip in db',
                status: 400
            });

        }

        /** Return new trip object if succsess */
        return NextResponse.json(newTrip);

    }catch(error){

        /** Handle errors */
        console.log(error);

        return NextResponse.json({error: error});

    }
}