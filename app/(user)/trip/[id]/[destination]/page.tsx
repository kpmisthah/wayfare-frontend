import { TravelItinerary } from "@/modules/user/components/plan-trip/TravelItinerary"

export default async function TripDetailsComponent({ params }: { params: Promise<{ id: string, destination: string }> }) {
    const { id, destination } = await params;
    return (
        <>
            <TravelItinerary id={id} destination={destination} />
        </>

    )
}