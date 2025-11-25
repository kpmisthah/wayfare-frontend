import { TravelItinerary } from "@/modules/user/components/plan-trip/TravelItinerary"

export default async function TripDetailsComponent({params}:{params:{id:string,destination:string}}){
    return(
        <>
        <TravelItinerary id={params.id} destination={params.destination} />        
        </>

    )
}