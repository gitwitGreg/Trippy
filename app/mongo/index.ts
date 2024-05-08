import mongooose from 'mongoose'

let isConnected = false;

export const connectToDb = async() => {

    if(isConnected){
        return;
    }

    try{
        await  mongooose.connect(process.env.DATABASE_URL as string, {
            dbName: 'Cluster0'
        })
        isConnected = true;

    }catch(error){
        console.log(error);
    }
}