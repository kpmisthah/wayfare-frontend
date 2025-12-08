import { TravelItinerary } from "@/modules/user/components/plan-trip/TravelItinerary"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function TripDetailsComponent({ params }: {params:{id:string,destination:string}}) {
    const { id, destination } = await params;
    return (
        <>
            <TravelItinerary id={id} destination={destination} />
        </>

    )
}