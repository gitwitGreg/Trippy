import PastTrips from "../components/PastTrips";
import { TripList } from "../components/Trips";

export default function Trips() {
    return(
        <div className="bg-black text-white h-auto w-screen p-10">
            <TripList />
        </div>
    )
}