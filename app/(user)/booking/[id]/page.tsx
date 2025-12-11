import BookingPage from "@/modules/user/components/booking/booking";


export default async function bookingPackage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    console.log(id, 'in paramsssss booking');

    return (
        <BookingPage id={id} />
    )
}